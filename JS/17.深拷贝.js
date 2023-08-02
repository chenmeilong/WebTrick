let obj = {
    uname : '张三丰',
    age : 22,
    sex : '男',
    color : ['red', 'blue', 'yellow', 'pink'],
    message : {
        score : 99,
        index : 6,
    },
    eat: function(){
        console.log('chi fan');          //拷贝函数会出现问题
    }
}
let newObj = {}
// 遍历
// 如果遇到obj[key]是复杂类型，再遍历操作
function kaobei (newObj, obj) {
    for ( let key in obj ) {
        if ( obj[key] instanceof Array ) {// obj[key] 是数组
            // 保证newObj[key]是数组
            newObj[key] = [];

            kaobei(newObj[key], obj[key]);
        } else if ( obj[key] instanceof Object ) {// obj[key] 是对象
            // 保证newObj[key]是对象
            newObj[key] = {};

            kaobei(newObj[key], obj[key])
        } else {
            newObj[key] = obj[key];
        }
    }
}
kaobei(newObj, obj);
obj.message.index = 666;
console.log(obj, newObj);