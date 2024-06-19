const express = require("express")
const router = express.Router()

// 导入路由处理函数
const { createOrder, getOrderList, getOrderDetail, cancelOrderByUser, finshOrderByUser, payOrder } = require('../controller/order_controller')

// 解密toeken中间件
const { expressjwt: jwt } = require('express-jwt')
const jwtconfig = require('../jwtconfig')

// 生成订单
router.post('/saveorder', jwt({ secret: jwtconfig.jwtKey, algorithms: ["HS256"] }), createOrder)

// 获取订单
router.get('/order', jwt({ secret: jwtconfig.jwtKey, algorithms: ["HS256"] }), getOrderList)

// 获取订单详情
router.get('/order/:order_id', jwt({ secret: jwtconfig.jwtKey, algorithms: ["HS256"] }), getOrderDetail)

// 手动取消订单
router.put('/order/:order_id/cancel', jwt({ secret: jwtconfig.jwtKey, algorithms: ["HS256"] }), cancelOrderByUser)

// 确认收货
router.put('/order/:order_id/finish', jwt({ secret: jwtconfig.jwtKey, algorithms: ["HS256"] }), finshOrderByUser)

// 模拟支付接口
router.get('/paySuccess', jwt({ secret: jwtconfig.jwtKey, algorithms: ["HS256"] }), payOrder)

module.exports = router