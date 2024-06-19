const express = require("express")
const router = express.Router()

// 导入路由处理函数
const { getAddress, getAddressDetail, addAddress, updateAddress, deleteAddress, getDefaultAddress } = require('../controller/address_controller')

// 解密toeken中间件
const { expressjwt: jwt } = require('express-jwt')
const jwtconfig = require('../jwtconfig')

// 导入验证数据中间件
const expressJoi = require('@escook/express-joi')
// 导入规则
const { address_shcema, addressupdate_shcema, addressid_schema } = require('../schema/address_shcema')

// 得到地址数据
router.get('/address', jwt({ secret: jwtconfig.jwtKey, algorithms: ["HS256"] }), getAddress)

// 得到默认地址
router.get('/address/default', jwt({ secret: jwtconfig.jwtKey, algorithms: ["HS256"] }), getDefaultAddress)

// // 得到地址详细数据
router.get('/address/:address_id', jwt({ secret: jwtconfig.jwtKey, algorithms: ["HS256"] }), expressJoi(addressid_schema), getAddressDetail)

// 添加地址
router.post('/address', jwt({ secret: jwtconfig.jwtKey, algorithms: ["HS256"] }), expressJoi(address_shcema), addAddress)

// 更新地址
router.put('/address', jwt({ secret: jwtconfig.jwtKey, algorithms: ["HS256"] }), expressJoi(addressupdate_shcema), updateAddress)

// 删除地址
router.delete('/address/:address_id', jwt({ secret: jwtconfig.jwtKey, algorithms: ["HS256"] }), expressJoi(addressid_schema), deleteAddress)

module.exports = router