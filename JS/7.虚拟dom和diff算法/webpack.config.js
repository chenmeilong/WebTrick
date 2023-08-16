// 引入 path模块
const path = require('path')

module.exports = {
  mode: 'none',
  // 入口
  entry: './src/index.js',
  // 出口
  output: {
    // 虚拟打包路径，就是说文件夹不会真正生成，而是在8080端口虚拟生成
    publicPath: '/virtualdir/',
    // 打包出来的文件名，不会真正的物理生成
    filename: 'bundle.js',
  },
  devServer: {
    // 静态资源文件夹
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    // 端口号
    port: 8080,
  },
}