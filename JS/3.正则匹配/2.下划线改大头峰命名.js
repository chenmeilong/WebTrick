function changeLine (str) {
    if(typeof str !== 'string'){
        console.log(('请确认要删除的对象为字符串！'));
    }else {
        var newName = '';
        var arr = str.split('_');
        arr.map((ad,i)=>{
            newName += ad.substring(0,1).toUpperCase() + ad.substring(1);
        })
        return newName
    }
}
console.log(changeLine('a_c_def'));