// 原型链继承,
// 优点：子类可以继承到父类的方法。
// 缺点：1. 父类的引用类型的属性被所有实例共享（因为就只new了一次）
//      2. 在创建 Child 的实例时，不能向 Parent 传参

function Parent() {
    this.name = "parent";
    this.play = [1, 2, 3];
}

Parent.prototype.getName = function () {
    console.log(this.name);
};

function Child() {
    this.type = "child";
}

Child.prototype = new Parent();

const s1 = new Child();
const s2 = new Child();

s1.play.push(4);
console.log(s1.play, s2.play); // [1, 2, 3, 4] [1, 2, 3, 4]
s1.getName(); // parent
s2.getName(); // parent
