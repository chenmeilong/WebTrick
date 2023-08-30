let  obj1 = {a:1,b:2}
let  obj2 = {a:1,b:3,c:3}

console.log({...obj1, ...obj2})
console.log(Object.assign(obj1,obj2));

