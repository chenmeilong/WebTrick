// 目标
class Subject {
  constructor() {
    this.observerLists = []
  }
  // 添加观察者
  addObs(obs) {
    if (obs && obs.update) {
      this.observerLists.push(obs)
    }
  }
  // 通知观察者
  notify() {
    this.observerLists.forEach((obs) => {
      obs.update()
    })
  }
  empty() {
    this.observerLists = []
  }
}

class Observer {
  // 定义观察者内容更新事件
  update() {
    // 在更新事件要处理的逻辑
    console.log('目标更新了')
  }
}

// 使用
// 创建目标
let sub = new Subject()
// 创建观察者
let obs1 = new Observer()
let obs2 = new Observer()
// 把观察者添加到列表中
sub.addObs(obs1)
sub.addObs(obs2)
// 目标开启了通知 每个观察者者都会自己触发 update 更新事件
sub.notify()

