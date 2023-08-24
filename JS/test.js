const getQueryParams = (url)=>{
    let arr = url.split('?')[1].split('&')
    let params = {}
    arr.forEach((paramStr)=>{
        let a = paramStr.split('=')
        params[a[0]] = decodeURIComponent(a[1])
    })
    return params
}

console.log(getQueryParams('https://stackabuse.com/search?q=%E4%BD%A0%E5%A5%BD&page=20'));