// 构造函数继承
// 缺点：
// 1.方法都在构造函数中定义，每次创建实例都会创建一遍方法
// 2.无法访问父类原型上的方法
function Parent(name) {
    this.name = name;
    this.play = [1, 2, 3];
}

Parent.prototype.getName = function () {
    console.log(this.name);
};

function Child(name) {
    Parent.call(this,name);
    this.type = "child";
}

const s1=new Child("Tom");
const s2=new Child("Jack");

s1.play.push(4);
console.log(s1, s2);
s1.getName(); // TypeError: s1.getName is not a function
s2.getName(); 
