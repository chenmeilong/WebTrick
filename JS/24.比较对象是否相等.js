let a  =  [1,2,3,[1,2,3],{a:1,b:3}]
let b  =  [1,2,3,[1,2,3],{b:3,a:1}]

const isSame = (a,b)=>{
    if(a===b) return true
    if(typeof a!=='object' && typeof b!=='object') return false
    if(a===null || b===null) return false
    // 对象或者数组需要递归判断  排序保证顺序一样
    keyA = Object.keys(a).sort()
    keyB = Object.keys(b).sort()
    if(keyA.length!==keyB.length) return false
    let isEqual = true
    for(let key of keyA){
        isEqual &&=  isSame(a[key],b[key])
    }
    return isEqual
}
console.log(isSame(a,b));
