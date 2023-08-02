const YNPromise = require('./promise.js')

console.log(1)
new YNPromise((resolve, reject) => {
    setTimeout(() => { 
        resolve(1)
    })
}).then(value => {
    console.log(4)
    console.log('value', value)
}, reason => {
    console.log(reason)
})
console.log(3)