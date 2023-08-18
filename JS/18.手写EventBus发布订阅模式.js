class EventBus {
    constructor() {
      // 用来存储事件
      // 存储的 例子 this.subs = { 'myclick': [fn1, fn2, fn3] ,'inputchange': [fn1, fn2] }
      this.subs = {}
    }
    $on(type, fn) {
      if (!this.subs[type]) {
        this.subs[type] = []
      }
      this.subs[type].push(fn)
    }
    $emit(type,...args) {
      if (this.subs[type]) {
        this.subs[type].forEach((fn) => fn(...args))
      }
    }
}
// 使用
const eventHub = new EventBus()
// 使用 $on 添加一个 sum 类型的 方法到 subs['sum']中
eventHub.$on('sum', function () {
let count = [...arguments].reduce((x, y) => x + y)
console.log(count)
})
// 触发 sum 方法
eventHub.$emit('sum', 1, 2, 4, 5, 6, 7, 8, 9, 10)