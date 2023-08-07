// 方式1 new Object 方式
// const obj1 = new Object({name: '小明',age: 18})
  
// 方式2 大括号简写方式
// const obj2 = {name: '小明',age: 18}

// 方式3 工厂函数方式
// function createPerson(name, age) {
// 	return {name,age,}
// }
// const obj3 = createPerson('小明', 18)

// 前三种都一样 本质都是new Object  无法根据对象的原型对象准确判断对象的类型​

// 方式4 构造函数方式
// 如果构造函数中包含的方法，则会重复创建，造成内存的浪费​（只适合放属性不适合方法）
// function Person(name, age) {
// 	this.name = name
//     this.age = age
//     this.getInfo = function() {
//         console.log(this.name, this.age)
//     }
// }
// const obj4 = new Person('小明', 18)

// 方式5 原型对象方式
// 将共同的方法放到原型当中可以避免重新创建相同功能的方法，减少了内存的使用。
// 这种方式只适合放方法，不适合放属性（因为不好初始化）
// function Person() {}
// Person.prototype.name = "这个人很懒，没有名字"
// Person.prototype.age = 1
// Person.prototype.getInfo = function() {
// 	console.log(this.name, this.age)
// }
// const xiaoming = new Person()
// // 这里使用的是原型上的属性
// xiaoming.getInfo() // "这个人很懒，没有名字", 1
// // 添加自身属性
// xiaoming.name = '小明'
// xiaoming.age = 18
// // 使用自身属性
// xiaoming.getInfo() // "小明", 18



// 方式6 方式4和5 的 混合模式
// 这种方式虽说解决了代码冗余的问题，但是却又不太符合面向对象封装的思想。​
// function Person(name, age) {
// 	this.name = name
//   this.age = age
// }
// Person.prototype.getInfo = function() {
// 	console.log(this.name, this.age)
// }
// const xiaoming = new Person(name, age)


// 方式7 动态混合 方式4和5 的 动态混合模式
// 这种方式的缺点是语义不符，其实只有第一个对象创建时才会走 if 判断​
// function Person(name, age) {
// 	this.name = name
//   this.age = age
//   if (Person.prototype.getInfo === "undefined") {
//   	Person.prototype.getInfo = function() {
//     	console.log(this.name, this.age)
//     }
//   }
// }
// // 第一次调用时会给 Person.prototype 添加 getInfo 方法
// const xiaoming = new Person("小明", 18) 
// const xiaoguang = new Person("小光", 15)



// 方式8 寄生构造函数 和7一样 但是通过函数里调用其他构造函数
// function Person(name, age) {
// 	this.name = name
//   this.age = age
//   if (Person.prototype.getInfo === "undefined") {
//   	Person.prototype.getInfo = function() {
//     	console.log(this.name, this.age)
//     }
//   }
// }
// function Programmer(name, age, lang) {
// 	const p = new Person(name, age)
//   p.lang = lang
//   return p
// }
// const xiaoming = Programmer("小明", 18, "JavaScript")
// const xiaoguang = Programmer("小光", 15, "C++")

// 方式9  class ES6语法糖
// class Person {
// 	constructor(name, age) {
//   	this.name = name
//     this.age = age
//   }
//   getInfo() {
//   	console.log(this.name, this.age)
//   }
// }
// const xiaoming = new Person("小明", 18)


// 方式10 闭包  利用闭包的特性，也可以实现创建对象的方式。 
// 这种方式的优点是不用 this 和 new。缺点就是容易造成内存泄漏。
function Person(name, age) {
    return {
      getName() {
          return name
      },
      setName: function(value) {
          name = value
      },
      getAge: function() {
          return age
      }
    }
}
const xiaoming = Person("小明", 18)
const xiaoguang = Person("小光", 15)
console.log(xiaoming.getName()) // 小明
console.log(xiaoguang.getName()) // 小光

xiaoming.setName("伪装成小光的小明")
console.log(xiaoming.getName()) // 伪装成小光的小明
  