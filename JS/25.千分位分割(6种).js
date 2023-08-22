// 数值千分位的 6 种方法
let source = 987654321.02

// 方法1 数字转字符串遍历拼接  贪心思想
// let res = ''
// let arr = source.toString().split('.')
// let zhen = arr[0].split('').reverse()
// zhen.forEach((char,i)=>{
//     if(i%3===0 && i!==0) res = ',' + res
//     res = char+res
// })
// res = res + '.' + arr[1]
// console.log(res);

// 方法二 数字转字符串使用slice切割
// let res = ''
// let arr = source.toString().split('.')
// let zhen = arr[0]
// res += zhen.slice(0,zhen.length%3)
// for(let i=zhen.length%3;i<zhen.length;i+=3){
//     if(res!=='') res+=','
//     res+= zhen.slice(i,i+3)
// }
// console.log(res+'.'+arr[1]);

// 方法3 除法取模(效率最高)

// 方法4 正则先行断言
// 字千分位分割： 将123456789转化为123,456,789
// 第一步：尝试把第一个逗号弄出来 console.log(price.replace(/(?=\d{3}$)/, ',')) // 123456,789
// 第二步：把所有逗号都弄出来 console.log(price.replace(/(?=(\d{3})+$)/g, ',')) // ,123,456,789
// 第三步：去掉首位的逗号 console.log(price.replace(/(?!^)(?=(\d{3})+$)/g, ',')) // 123,456,789
// let arr = source.toString().split('.')
// let zhen = arr[0].replace(/(?!^)(?=(\d{3})+$)/g,',')
// console.log(zhen+'.'+ arr[1]);



// 方式五 toLocaleString 方法 可以将数组转换为指定区域表示的格式 'en-us'  表示美国
console.log(source.toLocaleString('en-us')) // 987,654,321.02

// 方式六  使用js内置的 Internationalization Intl对象 转换成国际化标准
console.log(new Intl.NumberFormat('en-us').format(source)) // 987,654,321.02