const express = require("express")
const router = express.Router()

// 导入路由处理函数
const { register, login, info } = require('../controller/user_controller')

// 解密toeken中间件
const { expressjwt: jwt } = require('express-jwt')
const jwtconfig = require('../jwtconfig')

// 手写中间件
const { crpytPassword, verifyUser } = require('../middleware/user_middleware')

// 导入验证数据中间件
const expressJoi = require('@escook/express-joi')
// 导入规则
const { user_shcema } = require('../schema/user_shcema')

// 注册
router.post('/register', expressJoi(user_shcema), verifyUser, crpytPassword, register)

// 登录
router.post('/login', expressJoi(user_shcema), login)

// 获取用户信息
router.get('/info', jwt({ secret: jwtconfig.jwtKey, algorithms: ["HS256"] }), info)
module.exports = router