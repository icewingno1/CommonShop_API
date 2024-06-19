const express = require('express')

// 创建服务器实例
const app = express()

// 此处导入用于验证错误信息
const Joi = require('joi')

// 解决跨域问题
const cors = require('cors')
app.use(cors())

// 返回数据中间件
app.use((req, res, next) => {
    res.resMessage = (resultCode, message, data = null) => {
        res.send({
            resultCode,
            message: message instanceof Error ? message.message : message,
            data
        })
    }
    next()
})

// 配解析中间件
app.use(express.json())

// 挂载静态资源目录
app.use('/resource', express.static('./static'))

// 首页模块
const indexRouter = require('./router/index_router')
app.use(indexRouter)

// 分类模块
const categoryRouter = require('./router/categories_router')
app.use(categoryRouter)

// 商品展示
const goodsRouter = require('./router/goods_router')
app.use('/goods', goodsRouter)

// 购物车模块
const cartRouter = require('./router/cart_router')
app.use(cartRouter)

// 地址模块
const addressRouter = require('./router/address_router')
app.use(addressRouter)

// 用户模块
const userRouter = require('./router/user_router')
app.use('/user', userRouter)

// 支付，订单模块
const payRouter = require('./router/order_router')
app.use(payRouter)

// 错误级别中间件
app.use((err, req, res, next) => {
    if (err instanceof Joi.ValidationError) return res.resMessage(500, err)
    if (err.name === 'UnauthorizedError') return res.resMessage(500, '身份认证失败')
    if (err.type === 'entity.parse.failed') return res.resMessage(400, 'JSON解析失败')
    res.resMessage(500, err)
})

// 启动服务器
app.listen(80, () => {
    console.log('服务器开启成功')
})