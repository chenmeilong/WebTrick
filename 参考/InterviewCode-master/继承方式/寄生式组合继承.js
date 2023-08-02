// 寄生式组合继承
// 通过盗用构造函数继承属性，但使用混合式原型链继承方法
// 基本思路就是使用寄生式继承来继承父类的原型对象，然后将返回的新对象赋值给子类的原型对象。

function inherit(Son,Father){
    const prototype=Object.create(Father.prototype);    // 获取父类原型对象副本
    prototype.constructor=Son;  // 将获取的副本的constructor指向子类
    Son.prototype=prototype;    // 将子类的原型对象指向副本
}

function Person(name){
    this.name=name;
    this.play=[1,2,3];
}

Person.prototype.getName=function(){
    return this.name;
}

function Child(name){
    Person.call(this,name); // 盗用构造函数继承属性
}

inherit(Child,Person);  // 寄生式组合继承方法,不用再调用一次父类构造函数

const s1=new Child("Tom");
const s2=new Child("Jack");
s1.play.push(4)
console.log(s1,s2);
console.log(s1.getName(),s2.getName());


// class Person{
//     constructor(name){
//         this.name=name;
//         this.play=[1,2,3];
//     }
//     getName(){
//         return this.name;
//     }
// }

// class Student extends Person{
//     constructor(name){
//         super(name);
//         this.type="student";
//     }
// }

// function Person(name){
//     this.name=name;
// }

// Person.prototype.sayName=function(){
//     console.log(this.name);
// }

// function Student(name){
//     Person.call(this,name);
// }