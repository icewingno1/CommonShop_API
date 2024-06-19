const express = require("express")
const router = express.Router()

// 导入路由处理函数
const { getCart, addCart, deleteCart } = require('../controller/cart_controller')

// 解密toeken中间件
const { expressjwt: jwt } = require('express-jwt')
const jwtconfig = require('../jwtconfig')

// 手写中间件
const { verifyItem } = require('../middleware/cart_middleware')

// 导入验证数据中间件
const expressJoi = require('@escook/express-joi')
// 导入规则
const { cart_shcema } = require('../schema/cart_shcema')

// 得到购物车数据，需要token
router.get('/shop-cart', jwt({ secret: jwtconfig.jwtKey, algorithms: ["HS256"] }), getCart)

// 添加购物车数据
router.post('/shop-cart', jwt({ secret: jwtconfig.jwtKey, algorithms: ["HS256"] }), expressJoi(cart_shcema), verifyItem, addCart)

// 删除购物车数据
router.delete('/shop-cart/:cart_item_id', jwt({ secret: jwtconfig.jwtKey, algorithms: ["HS256"] }), deleteCart)

module.exports = router