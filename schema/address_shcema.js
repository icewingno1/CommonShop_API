const Joi = require('joi')

const user_name = Joi.string().required()
const user_phone = Joi.string().pattern(/^((\+|00)86)?1[3-9]\d{9}$/).required()
const province_name = Joi.string().required()
const city_name = Joi.string().required()
const region_name = Joi.string().required()
const detail_address = Joi.string().required()
const default_flag = Joi.number().required()
const address_id = Joi.number().required()
// 导出规则
exports.address_shcema = {
    body: {
        user_name,
        user_phone,
        province_name,
        city_name,
        region_name,
        detail_address,
        default_flag
    }
}

exports.addressupdate_shcema = {
    body: {
        user_name,
        user_phone,
        province_name,
        city_name,
        region_name,
        detail_address,
        default_flag,
        address_id
    }
}

exports.addressid_schema = {
    params: {
        address_id
    }
}