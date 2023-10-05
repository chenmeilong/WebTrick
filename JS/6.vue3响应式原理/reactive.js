// 判断是否为对象 ，注意 null 也是对象
const isObject = val => val !== null && typeof val === 'object'
// 判断key是否存在
const hasOwn = (target, key) => Object.prototype.hasOwnProperty.call(target, key)

function reactive(target) {
    // 首先先判断是否为对象
    if (!isObject(target)) return target

    const handler = {
        get(target, key, receiver) {
            console.log(`获取对象属性${key}值`)
            // 收集依赖
            console.log(target, key,'##');
            track(target, key)

            const result = Reflect.get(target, key, receiver)
            // 递归判断的关键, 如果发现子元素存在引用类型，递归处理。
            if (isObject(result)) {
                return reactive(result)
            }
            return result
        },

        set(target, key, value, receiver) {
            console.log(`设置对象属性${key}值`)

            // 首先先获取旧值
            const oldValue = Reflect.get(target, key, reactive)

            // set 是需要返回 布尔值的
            let result = true
            // 判断新值和旧值是否一样来决定是否更新setter
            if (oldValue !== value) {
                result = Reflect.set(target, key, value, receiver)
                // 
                trigger(target, key)
            }
            return result
        },

        deleteProperty(target, key) {
            console.log(`删除对象属性${key}值`)

            // 先判断是否有key
            const hadKey = hasOwn(target, key)
            const result = Reflect.deleteProperty(target, key)

            if (hadKey && result) {
                // 派发更新
                trigger(target, key)
            }

            return result
        },
    }
    return new Proxy(target, handler)
}

// activeEffect 表示当前正在走的 effect
let actieEffect = null
function effect(callback) {
    actieEffect = callback
    callback()
    actieEffect = null
}

// targetMap 表里每个key都是一个普通对象 对应他们的 depsMap
let targetMap = new WeakMap()

function track(target, key) {
    // 如果当前没有effect就不执行追踪
    if (!actieEffect) return
    // 获取当前对象的依赖图
    let depsMap = targetMap.get(target)
    // 不存在就新建
    if (!depsMap) {
        targetMap.set(target, (depsMap = new Map()))
    }
    // 根据key 从 依赖图 里获取到到 effect 集合
    let dep = depsMap.get(key)
    // 不存在就新建
    if (!dep) {
        depsMap.set(key, (dep = new Set()))
    }
    // 如果当前effectc 不存在，才注册到 dep里
    if (!dep.has(actieEffect)) {
        dep.add(actieEffect)
    }
}

// trigger 响应式触发
function trigger(target, key) {
    // 拿到 依赖图
    const depsMap = targetMap.get(target)
    if (!depsMap) {
        // 没有被追踪，直接 return
        return
    }
    // 拿到了 视图渲染effect 就可以进行排队更新 effect 了
    const dep = depsMap.get(key)

    // 遍历 dep 集合执行里面 effect 副作用方法
    if (dep) {
        dep.forEach(effect => {
            effect()
        })
    }
}

// 判断是否是一个对象，是就用 reactive 来代理
const convert = val => (isObject(val) ? reactive(val) : val)

class RefImpl {
    constructor(_rawValue) {
        this._rawValue = _rawValue
        this.__v_isRef = true
        // 判断 _rawValue 是否是一个对象
        // 如果是对象调用reactive使用 proxy来代理
        // 不是返回 _rawValue 本身
        this._value = convert(_rawValue)
    }
    // 使用get/set 存取器，来进行追踪和触发
    get value() {
        // 追踪依赖
        track(this, 'value')
        // 当然 get 得返回 this._value
        return this._value
    }
    set value(newValue) {
        // 判断旧值和新值是否一直
        if (newValue !== this._value) {
            this._rawValue = newValue
            // 设置新值的时候也得使用 convert 处理一下，判断新值是否是对象
            this._value = convert(this._rawValue)
            // 触发依赖
            trigger(this, 'value')
        }
    }
}

function ref(rawValue) {
    // __v_isRef 用来标识是否是 一个 ref 如果是直接返回，不用再转
    if (isObject(rawValue) && rawValue.__v_isRef) return

    return new RefImpl(rawValue)
}

class ObjectRefImpl {
    constructor(proxy, _key) {
        this._proxy = proxy
        this._key = _key
        // __v_isRef 用来标识是否是 一个 ref
        this.__v_isRef = true
    }
    get value() {
        // 这里不用收集依赖
        // this._proxy 就是响应式对象，当访问[this._key]时，this._proxy里面会去自动收集依赖
        return this._proxy[this._key]
    }
    set value(newVal) {
        // 这里不用收集依赖
        // this._proxy 响应式对象，会在this._proxy里面set去调用trigger
        this._proxy[this._key] = newVal
    }
}

// 暴露出去的方法
function toRef(proxy, key) {
    return new ObjectRefImpl(proxy, key)
}

function toRefs(proxy) {
    // 判断 当前 proxy 是 proxy 数组， 还是 proxy 对象
    const ret = proxy instanceof Array ? new Array(proxy.length) : {}

    for (const key in proxy) {
        // 内部还是调用 toRef 进行转为 响应式
        ret[key] = toRef(proxy, key)
    }

    return ret
}