const Joi = require('joi')

const login_name = Joi.string().pattern(/^((\+|00)86)?1[3-9]\d{9}$/).required()
const password = Joi.string().required()

// 导出规则
exports.user_shcema = {
    body: {
        login_name,
        password
    }
}
