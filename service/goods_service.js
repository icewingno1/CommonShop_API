const goodsModel = require('../model/goods_model')
const { Op } = require('sequelize')

const getListByKW = async ({ keyword }) => {
    // 模糊查询
    const res = await goodsModel.findAll({
        where: {
            goods_name: {
                [Op.like]: `%${keyword}%`
            }
        }
    })
    return res
}

const getListByID = async ({ category_id }) => {
    const res = await goodsModel.findAll({
        where: {
            category_id
        }
    })
    return res
}

const getDetail = async ({ goods_id }) => {
    const res = await goodsModel.findOne({
        where: {
            goods_id
        }
    })
    return res
}

module.exports = {
    getDetail,
    getListByKW,
    getListByID
}