const Router = require('koa-router')
const router = new Router()

router.get('/', async ctx => {
    // ctx.body = "index"

    // 渲染页面
    await ctx.render('index', {
        title: 'handlebars测试页面',
        subTitle: 'title',
        isShow: true,
        username: 'username123',
        users: [{
            username: 'a',
            birth: new Date(1999, 2, 3)
        }, {
            username: 'b',
            birth: new Date(1997, 2, 4)
        }, {
            username: 'c',
            birth: new Date(1993, 2, 5)
        }]
    })
})

module.exports = router