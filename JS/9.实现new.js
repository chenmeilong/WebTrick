function myNew(context,...args) {
    const obj = new Object();
    obj.__proto__ = context.prototype;
    const res = context.apply(obj, args);
    return typeof res === "object" ? res : obj;
}

function Person(age, sex) {
    this.age = age;
    this.sex = sex;
    return this;
}

const p = myNew(Person, 18,"男");
console.log(p,p instanceof Person);