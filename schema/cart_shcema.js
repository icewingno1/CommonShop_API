const Joi = require('joi')

const goods_count = Joi.number().required()
const goods_id = Joi.number().required()

// 导出规则
exports.cart_shcema = {
    body: {
        goods_count,
        goods_id
    }
}
