const Koa = require('koa')
const proxy = require('http-proxy-middleware')

const app = new Koa();

//跨域代理
app.use(async (ctx, next) => {
    if(ctx.url.startsWith('/cityjson')) {
        ctx.respond = false;
        return proxy( {
            target: 'http://pv.sohu.com',
            changeOrigin: true,
        })(ctx.req, ctx.res, next)
    }
    return next();
})