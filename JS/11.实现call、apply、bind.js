// 为了让所有函数都可以调用这个方法，方法应该添加到 Function 的原型上。

// 将函数挂在对象的新属性上，改变this的指向，调用函数，删除新属性，返回函数执行结果
// 步骤
// 1. 判断调用对象是不是函数；
// 2. 如果没有传入上下文对象，则默认为全局对象 window
// 3. this是调用myCall的函数，将函数绑定到上下文对象的新属性上
// 4. 调用绑定的函数，并传入参数
// 5. 删除绑定的函数，使对象保持原样
// 6. 返回函数的返回结果
Function.prototype.myCall = function (context, ...args) {
    if(typeof this !== "function"){
        throw new TypeError('error');
    }
    context = context || window;
    context.fn = this;
    const result = context.fn(...args);
    delete context.fn;
    return result;
};

// myApply和call一样 就改改参数形式就行
Function.prototype.myApply = function(context,args){
    if(typeof this !== 'function') throw new Error('type error')
    context = context || window
    context.fn = this
    let res = context.fn(...args)
    delete context.fn
    return res
}

function print(a,b){
    console.log(Object.prototype.toString.call(this),a+b);
}
const obj1=[1,2,3];
const obj2={};
print.myCall(obj1,1,2);
print.myCall(obj2,2,3);

///////////bind///////////////////bind////////////////bind//////////////////////
// 注意bind的调用方式  直接调用的还是new的  因为他们的返回值并不一样
/*
function foo(x, y, z) {
    this.name = "张三";
    console.log(this.num, x + y + z);
}
var obj = {
   num: 666
}
var foo2 = foo.bind(obj, 1,2,3);
console.log(new foo2());
// 直接调用的输出
// 666 6
// undefined
// 添加new的输出
// undefined 6
// foo { name: '张三' }
*/


// myBind ：：本质是反柯里化一层

// 1. 判断调用对象是不是函数；
// 2. 如果没有传入上下文对象，则默认为全局对象 window
// 3. this是调用bind的函数，需要_this记录下来
// 4. 返回一个新的函数作为绑定函数
// 返回的函数中 通过 (this instanceof 构造函数) 判断是否为new
// 是new的方式则 返回new  不是new则调用 apply

Function.prototype.myBind = function(context, ...args) {
    if(typeof this !== "function"){
        throw new Error('type error');
    }
    context = context || window
    const _this = this
    return function fn(...innerArgs) {
        if(this instanceof fn){
            return new _this(...args, ...innerArgs);
        }
        return _this.apply(context, [...args, ...innerArgs]);
    };
};
print.myBind(obj1)(1,2);
print.myBind(obj2)(2,3);