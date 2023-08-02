// 寄生式继承
// 寄生式继承与原型式继承很接近，它的思想就是在原型式继承的基础上以某种方式增强对象，然后返回这个对象。

function inherit(o) {
    let clone = Object.create(o); // 通过调用函数创建一个新对象
    clone.sayName = function () {
        console.log("Hi, I'm " + this.name);
    }; // 以某种方式增强这个对象

    return clone; // 返回这个对象
}

const s1 = {
    name: "Tom",
    friends: ["Jack", "Rose"],
};

const s2 = inherit(s1);

console.log(s2.friends);
s2.sayName();   
