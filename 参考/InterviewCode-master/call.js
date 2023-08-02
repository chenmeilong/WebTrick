const window = this;
Function.prototype.myCall = function (context) {
    console.log(arguments);
    // 判断调用对象
    if (typeof this !== "function") {
        throw new Error("Type Error");
    }
    // 首先获取参数
    let args = [...arguments].slice(1);
    let result = null;

    // 判断context是否传入，如果没有就设置为window
    context = context || window;

    // 将被调用的方法设置为context的属性
    // this即为我们调用的方法
    context.fn = this;
    result = context.fn(...args);
    // 删除手动增加的属性方法
    delete context.fn;

    return result;
};

function print(a,b){
    console.log(Object.prototype.toString.call(this),a+b);
}

const obj1=[1,2,3];
const obj2={};

print.myCall(obj1,1,2);
print.myCall(obj2,2,3);