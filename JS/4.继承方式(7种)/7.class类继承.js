
// 通过extends关键字实现继承
class Person{
    constructor(name){
        this.name=name
    }
}

class Student extends Person{
    constructor(name,age){
        super(name)
        this.age=age
    }
}

let s=new Student('bruce',20)
console.log(s);  //Student { name: 'bruce', age: 20 }
