// 对象扁平化

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

// console.log(objFlat({a:1,b:{c:3,d:{e:5,f:6},g:7}}));
console.log(objFlat([1,2,3,4,[5,6]]));