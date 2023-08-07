// 构造函数继承
// 优点：相较于原型链继承，构造函数继承不会共享父类上的引用类型数据，不会互相影响。
// 缺点：
// 1.方法都在构造函数中定义，每次创建实例都会创建一遍方法(效率低)
// 2.无法访问父类原型上的方法，即 Person.prototype 上的都不能访问到。
// (因为只简单的调用了父类的构造器,相当于把父类的的所有属性和方法都拿了过来)
function Parent(name) {
    this.name = name;
    this.play = [1, 2, 3];
    this.getPlay = function () {
        console.log(this.play);
    };
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
s2.getPlay(); 
s1.getName(); // TypeError: s1.getName is not a function
// s2.getName(); 
