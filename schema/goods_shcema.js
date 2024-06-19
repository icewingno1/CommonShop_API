const Joi = require('joi')

const goods_id = Joi.number().required()

// 导出规则
exports.goods_shcema = {
    params: {
        goods_id
    }
}
