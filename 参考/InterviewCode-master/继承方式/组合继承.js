// 组合继承
// 优点：1.可以继承父类的属性和方法，也可以继承父类原型上的属性和方法
// 缺点：1.调用了两次父类构造函数
function Person(name){
    this.name=name;
}

Person.prototype.getName=function(){
    return this.name;
}

function Child(name){
    Person.call(this,name);
}

Child.prototype=new Person();

const s1=new Child("Tom");
const s2=new Child("Jack");

console.log(s1,s2);
console.log(s1.getName(),s2.getName());