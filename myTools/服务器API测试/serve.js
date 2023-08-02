// 从文件为node服务，启动在服务器上的

// 1. 导入 express
const express = require('express')
// 2. 创建 web 服务器
const app = express()
const cors = require('cors') //跨域
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))  //解析表单中间件配置

app.post('/image', (req, res) => {
    let imgs = ['https://img.mileschen.cn/blog/20230722101929.png','https://img.mileschen.cn/blog/20230722101817.png','https://img.mileschen.cn/blog/20230722101757.png','https://img.mileschen.cn/blog/20230722101739.png','https://img.mileschen.cn/blog/20230722101316.png']
    let ids = [1,2,3,4,5]
    res.send({state:1,data:{id:ids[req.body.index],img:imgs[req.body.index]}})
})
// 3. 启动 web 服务器
app.listen(8887, () => {
  console.log('express server running at http://127.0.0.1')
})