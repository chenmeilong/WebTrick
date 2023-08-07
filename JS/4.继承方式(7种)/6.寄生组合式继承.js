// 这个是一个比较完美的继承方式,使用组合继承与寄生继承。

// 结合了组合继承，借助一个空的构造函数，将父类的原型挂载到这个空的构造函数上面，
// 然后将其附在子类的原型上面，这样就解决了组合式继承的缺点。
function Father(name, age) {
    this.name = name
    this.age = age
    this.like = {
        sport: 'running',
        book: 'JavaScript'
    }
    this.getName = function () {
        console.log(this.name);
    }
}
Father.prototype.sayHello = function () {
    console.log('你好');
}
function Son(name, age) {
    Father.call(this, name, age)  // 借用构造函数  关键一行
}
// 还是会丢失，这样要写的方法要写在最后 ，继承处理完的后面
// Son.prototype.say = function(){
//     console.log('hello');
// }

// const Fn=function(){}
// Fn.prototype=Father.prototype
// Son.prototype = new Fn()
// 合成一行  Object.create(Father.prototype)
// 组合继承关键三行
function inherit(Son,Father){
    const prototype=Object.create(Father.prototype);//创建对象，创建父类原型的一个副本
    prototype.constructor=Son;                      //增强对象，弥补因重写原型而失去的默认constructor属性
    Son.prototype=prototype;                        //指定对象，将创建的对象赋值给子类的原型
}
inherit(Son,Father)

let s1 = new Son('bruce', 18)
s1.sayHello() // 你好
console.log(s1);
s1.say()
