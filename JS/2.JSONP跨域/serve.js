const http = require('http')
const url = require('url')
const server = http.createServer()
server.on('request',function(req,res){
    // 将api/test?callback=func 解析为 query和pathname urlobj是个对象还有一起其他内容
    let urlobj = url.parse(req.url,true)
    console.log(urlobj);
    if(urlobj.pathname === '/api/test'){
        // 返回了一个函数 func({name:'张三'})
        res.end(`${urlobj.query.callback}(${JSON.stringify({name:'张三'})})`)
    }else{
        res.end('404')
    }
})
server.listen(4433,function(){
    console.log('server start');
})