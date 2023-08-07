//  这种继承方式跟原型式继承有着异曲同工之妙
// 它的思想就是在原型式继承的基础上以某种方式增强对象，然后返回这个对象。
// 其存在的缺点也与原型式继承一样。

// 调用一次函数就得创建一遍方法，无法实现函数复用，效率较低

// clone = Object.create(o)等价于下面这些代码
// function object(o){  // 
//     function F(){}  
//     F.prototype=o
//     return new F()  
// }

function inherit(o) {
    let clone = Object.create(o); // 通过现有对象为原型创建一个新对象
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
