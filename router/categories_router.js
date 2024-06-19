const express = require("express")
const router = express.Router()

// 导入路由处理函数
const { getCategories } = require('../controller/categories_controller')

// 得到分类数据
router.get('/categories', getCategories)

module.exports = router