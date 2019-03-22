const Koa = require('koa')
const static = require('koa-static')
const app = new Koa()
// 导入路由文件
const index = require('./routes/index')
const users = require('./routes/users')

// 引入模板引擎
const hbs = require('koa-hbs')
const helpers = require('./utils/helpers')
app.use(hbs.middleware({
    viewPath: __dirname + '/views', // 视图根目录
    defaultLayout: 'layout', // 默认布局页面
    partialsPath: __dirname + '/views/partials', // 注册partial目录
    disableCache: true // 开发阶段不缓存
}))
// 中间件框架
// 中间件是一个异步函数，对用户的请求和响应做预处理

// 错误处理写在最上面
app.use(async (ctx, next) => {
    try {
        await next()
    } catch (error) {
        console.log(error)
        ctx.status = error.statusCode || error.status || 404
        ctx.body = error.message // 给用户显示信息
        // 全局错误处理
        ctx.app.emit('error', error)
    }

})

// 静态文件服务
app.use(static(__dirname + '/public'))

// 响应时间输出中间件
app.use(async (ctx, next) => {
    // next() 上方写请求操作
    await next()
    // next() 下方写响应操作
    const rt = ctx.response.get('X-Response-Time')
    console.log(`输出计时：${ctx.method} ${ctx.url} - ${rt}`)
})

// 响应时间统计中间件
app.use(async (ctx, next) => {
    // next() 上方写请求操作
    const start = Date.now()
    console.log('开始计时')
    await next()
    // next() 下方写响应操作
    const ms = Date.now() - start
    ctx.set('X-Response-Time', `${ms}ms`)
    console.log(`计时结束`)
})

// // 错误
// app.use(async (ctx, next) => {
//     // throw new Error('啊哦，出错了')
//     ctx.throw(500, '错误')
// })

// // 响应
// app.use(ctx => {
//     console.log('响应用户请求')
//     ctx.status = 200
//     ctx.type = 'html'
//     ctx.body = `<h1>Hello</h1>`
// })
// 路由挂载
app.use(index.routes())
app.use(users.routes())

// 开始监听
// 监听错误事件
app.on('error', (err) => {
    console.log(err)
})
// 监听端口
// 等同于直接使用nodejs中http.createServer(app.callback()).listen(3000)
app.listen(3000)