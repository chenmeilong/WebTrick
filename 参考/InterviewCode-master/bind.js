// 实现bind函数
Function.prototype.myBind = function (context) {
    if (typeof this !== "function") {
        throw new Error("Type Error");
    }
    console.log(context);

    const args = [...arguments].slice(1);
    const fn = this;
    return function Fn() {
        return fn.apply(
            context,
            args.concat([...arguments])
        );
    };
};

function print(value) {
    console.log(this.text);
    console.log(value)
}

let obj = {
    text: "this.value is ",
};
let bindObj = print.myBind(obj);

bindObj(5);
let newObj=new bindObj(10);