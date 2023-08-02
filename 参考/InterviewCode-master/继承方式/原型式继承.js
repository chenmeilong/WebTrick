// 原型式继承
// ES5新增 Object.create()
// 缺点：引用类型的属性被所有实例共享，不用Object.create()则不能传递参数

const s1 = {
    name: "Tom",
    friends: ["Jack", "Rose"],
};

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
