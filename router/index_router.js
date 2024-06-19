const express = require("express")
const router = express.Router()

// 导入路由处理函数
const { getinfo } = require('../controller/index_controller')

// 得到首页数据
router.get('/index-infos', getinfo)

module.exports = router