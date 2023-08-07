const str = `<div>姓名：{{name}}</div>
<div>年龄：{{ age }}</div>
<div>性别：{{  gender}}</div>
<div>住址：{{address  }}</div>`

function template(str, data) {
    var pattern = /{{\s*([a-zA-Z]+)\s*}}/
    var pattResult = null
    while (pattResult = pattern.exec(str)) {
      str = str.replace(pattResult[0], data[pattResult[1]])
    }
    return str
}
var data = { name: 'zs', age: 28, gender: '男', address: '北京顺义马坡' }
console.log(template(str,data));