// 原型式继承  优缺点和原型链继承有点像,但是
// ES5新增 Object.create()

// 优点：子类可以继承到父类的方法。
// 缺点：1. 父类的引用类型的属性被所有实例共享
//      2. 在创建 Child 的实例时，不能向 Parent和children 传参  (使用Object.create()可解决)

const s1 = {
    name: "Tom",
    friends: ["Jack", "Rose"],
};

// 原始写法  不能传递参数
// function object(s1){  // 参数为父类  
//     function F(){}  
//     F.prototype=s1
//     return new F()  
// }

// 
// Object.create 以一个现有对象作为原型（第一个参数），创建一个新对象，第二个参数为新对象上新增属性
const s2 = Object.create(s1, {
    age: {
        value: 18,
        writable: true, // 可写
        enumerable: true,   // 可枚举
        configurable: false,    // 不可配置
    },
});

console.log(s1);
console.log(s2);
