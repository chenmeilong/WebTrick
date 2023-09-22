//先定义三个状态常量,这样可以避免在写代码期间维护字符串
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
    //定义初始状态
    status = PENDING;
    //用来保存成功的值
    value = null;
    //用来保存失败的值
    reason = null;
    //构造器接收一个执行器方法,会在构造器内部立即执行,然后回传两个回调方法
    constructor(executor){
        executor(this.resolve,this.reject)
    }
    //成功的回调
    resolve = (val) => {
        //这里加判断的原因是因为promise的状态只会被修改一次,成功即成功,失败即失败
        if(this.status != PENDING) return
        this.status = FULFILLED;
        this.value = val;
    }
    //失败的回调
    reject = (reason) => {
        if(this.status != PENDING) return
            this.status = REJECTED;
        this.reason = reason;
    }
    then = (onRejected, onResolved) => {
        onRejected = typeof onRejected === 'function' ?onRejected : ()=>{};
        onResolved = typeof onResolved === 'function' ? onResolved : ()=>{};
        // 如果是等待状态，函数加入对应列表
        // if(this.status===PENDING){
        //     this.rejectedCallbacks.push(onRejected)
        //     this.resolveCallbacks.push(onResolved)
        // }
        if(this.status === FULFILLED) {
            onResolved(this.value)
        }
        if(this.status === REJECTED) {
            onRejected(this.value)
        }
    }
}
let p1 = new MyPromise((resolve, reject) => {
    resolve(123)
})
console.log(p1)
p1.then(res=>{
    console.log('success '+res);
}, reason=>{
    console.log('failed '+reason);
})
