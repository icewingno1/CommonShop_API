const addressModel = require('../model/address_model')

const getAddress = async ({ user_id }) => {
    const res = await addressModel.findAll({
        where: {
            user_id // 根据用户输入的 userID 进行筛选
        }
    })
    return res
}

const getAddressDetail = async ({ user_id, address_id }) => {
    const res = await addressModel.findOne({
        where: {
            user_id,
            address_id
        }
    })
    return res
}

const addAddress = async ({ user_id, user_name, user_phone, province_name, city_name, region_name, detail_address, default_flag }) => {
    const res = await addressModel.create({ user_id, user_name, user_phone, province_name, city_name, region_name, detail_address, default_flag })
    return res
}

const updateDefault = async ({ user_id }) => {
    const res = await addressModel.update({ default_flag: 0 }, {
        where: {
            user_id
        }
    })
    return res
}

const updateAddress = async ({ user_id, user_name, user_phone, province_name, city_name, region_name, detail_address, default_flag, address_id }) => {
    const res = await addressModel.update({ user_name, user_phone, province_name, city_name, region_name, detail_address, default_flag }, {
        where: {
            user_id,
            address_id
        }
    })
    return res
}

const deleteAddress = async ({ user_id, address_id }) => {
    const res = await addressModel.destroy({
        where: {
            user_id,
            address_id
        }
    })
    return res
}

const getDefaultAddress = async ({ user_id }) => {
    const res = await addressModel.findOne({
        where: {
            user_id,
            default_flag: 1
        }
    })
    return res
}

module.exports = {
    getAddress,
    getAddressDetail,
    addAddress,
    updateDefault,
    updateAddress,
    deleteAddress,
    getDefaultAddress
}