const window = this;
// 实现apply函数
Function.prototype.myApply = function (context) {
    console.log(arguments);
    // 判断调用对象
    if (typeof this !== "function") {
        throw new Error("Type Error");
    }
    let result = null;

    // 判断context是否传入，如果没有就设置为window
    context = context || window;

    // 使用Symbol来保证属性唯一
    // 也就是保证不会重写用户自己原来定义在context中的同名属性
    const fnSymbol=Symbol();
    context[fnSymbol]=this;

    if(arguments[1]){
        result=context[fnSymbol](...arguments[1]);
    }else{
        result=context[fnSymbol]();
    }
    delete context[fnSymbol];

    return result;
};

function print(n){
    console.log(Object.prototype.toString.call(this),n);
}

const obj1=[1,2,3];
const obj2={};

print.myApply(obj1,[1,2]);
print.myApply(obj2,[2,3]);