class Vue {
    constructor() {
      // 用来存储事件
      // 存储的 例子 this.subs = { 'myclick': [fn1, fn2, fn3] ,'inputchange': [fn1, fn2] }
      this.subs = {}
    }
    // 实现 $on 方法 type是任务队列的类型 ,fn是方法
    $on(type, fn) {
      // 判断在 subs是否有当前类型的 方法队列存在
      if (!this.subs[type]) {
        // 没有就新增一个 默认为空数组
        this.subs[type] = []
      }
      // 把方法加到该类型中
      this.subs[type].push(fn)
    }
    // 实现 $emit 方法
    $emit(type) {
      // 首先得判断该方法是否存在
      if (this.subs[type]) {
        // 获取到参数
        const args = Array.prototype.slice.call(arguments, 1)
        // 循环队列调用 fn
        this.subs[type].forEach((fn) => fn(...args))
      }
    }
}
// 使用
const eventHub = new Vue()
// 使用 $on 添加一个 sum 类型的 方法到 subs['sum']中
eventHub.$on('sum', function () {
let count = [...arguments].reduce((x, y) => x + y)
console.log(count)
})
// 触发 sum 方法
eventHub.$emit('sum', 1, 2, 4, 5, 6, 7, 8, 9, 10)