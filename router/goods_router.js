const express = require("express")
const router = express.Router()

// 导入路由处理函数
const { getList, getDetail } = require('../controller/goods_controller')

// 导入验证数据中间件
const expressJoi = require('@escook/express-joi')
// 导入规则
const { goods_shcema } = require('../schema/goods_shcema')

// 得到搜索数据
router.get('/search', getList)

// 得到商品详情信息
router.get('/detail/:goods_id', expressJoi(goods_shcema), getDetail)
module.exports = router