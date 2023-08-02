const http = require('http')

const server = http.createServer();
server.listen(4000, () => {
    process.title = '01'
    console.log('id', process.pid)
})