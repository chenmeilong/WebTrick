function myInstanceof(target, origin) {
    if (typeof target !== "object" || target == null) {
        return false;
    }
    if (typeof origin !== "function") {
        throw new Error("origin must be a function");
    }

    let proto = Object.getPrototypeOf(target); // 相当于 proto = target.__proto__;
    // 循着原型链一直往上寻找
    while (proto) {
        if (proto === origin.prototype) {
            return true;
        }
        proto = Object.getPrototypeOf(proto);
    }
    return false;
}

class Person {
    type = "Person";
}

class Student extends Person {
    constructor(name, age) {
        super();
        this.name = name;
        this.age = age;
    }
}

let stu = new Student("wx", 18);
console.log(stu);
console.log(stu.type, stu instanceof Student, stu instanceof Person);
console.log(stu.type, myInstanceof(stu, Student), myInstanceof(stu, Person));
