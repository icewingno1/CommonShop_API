const indexModel = require('../model/index_model')
const goodsModel = require('../model/goods_model')
const { Op } = require('sequelize');

const getinfo = async () => {
    const res = await indexModel.findAll({
        attributes: ['config_type'], // 只选择 config_type 字段  
        include: [{
            model: goodsModel,
            attributes: ['goods_id', 'goods_name', 'goods_intro', 'goods_cover_img', 'selling_price', 'tag'],
            where: { goods_id: { [Op.col]: 'index_config.goods_id' } }, // 确保 goods_id 相等  
            required: true, // inner join提升速度 
            as: 'goods',
        }]
    })
    return res
}

module.exports = {
    getinfo
}