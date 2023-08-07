var arr = [1, 2, [3, 4],5,[6,[7]]];// 展开一层数组

// 方法一 ES10的flat方法
// console.log('flat默认只展开一层:',arr.flat());
// console.log('flat传参展开指定层:',arr.flat(2));
// console.log('flat传参展开任意层:',arr.flat(Infinity));


// 方法二：join+split+map
console.log(arr.join(',').split(',').map(Number));

// 方法三：递归+reduce+concat
// 如果想要传递指定层，多穿一个参数，并且递归也要传参layer-1
const flatDeep = (arr)=>{
    return arr.reduce((res,item)=>{
        return res.concat(item instanceof Array?flatDeep(item):item)
    },[]) 
}
console.log(flatDeep(arr));

// 方法四:递归+yield
function* flatten(array) {    
    for (const item of array) {        
      if (Array.isArray(item)) {            
        yield* flatten(item);        
     } else {            
        yield item;        
     }    
    }
}
// 使用next()可以一个个取出来，但是太麻烦，所以可以用扩展运算符
console.log([...flatten(arr)]); // [1, 2, 3, 4, 5, 6]
   


//对象扁平化
const objFlat = (obj)=>{
    let flatobj = {}
    for(let key in obj){
        if(obj[key] instanceof Object){
            Object.assign(flatobj,objFlat(obj[key]))
        }else{
            flatobj[key] = obj[key]
        }
    }
    return flatobj
}
console.log(objFlat({a:1,b:{c:3,d:{e:5,f:6},g:7}}));