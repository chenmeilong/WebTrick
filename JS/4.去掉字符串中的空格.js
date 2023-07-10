var trim = function(str){
    return str.replace(/\s*/g,"")
}
// str.replace(/\s*/g,""); //去除字符串内所有的空格
// str.replace(/^\s*|\s*$/g,""); //去除字符串内两头的空格
// str.replace(/^\s*/,""); //去除字符串内左侧的空格
// str.replace(/(\s*$)/g,""); //去除字符串内右侧的空格

console.log(trim('  a b sdsd  '));
