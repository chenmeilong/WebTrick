// new实现

function myNew(context) {
    const obj = new Object();
    console.log(context);
    obj.__proto__ = context.prototype;
    const res = context.apply(obj, [...arguments].slice(1));
    return typeof res === "object" ? res : obj;
}

function Person(age, sex) {
    this.age = age;
    this.sex = sex;
    return this;
}

const p = myNew(Person, 18,"男");
console.log(p,p instanceof Person);
