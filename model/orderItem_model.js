const { DataTypes } = require('sequelize')
const seq = require('../db/seq')

// 外键及关联
const orderModel = require('./order_model')

// 创建模型
const orderItemModel = seq.define('orderitem_info', {
    order_item_id: {
        type: DataTypes.BIGINT,
        primaryKey: true
    },
    order_id: {
        type: DataTypes.BIGINT,
        references: {
            model: orderModel,
            key: 'order_id',
        }
    },
    goods_id: {
        type: DataTypes.BIGINT
    },
    goods_name: {
        type: DataTypes.STRING(200)
    },
    goods_cover_img: {
        type: DataTypes.STRING(200)
    },
    selling_price: {
        type: DataTypes.INTEGER
    },
    goods_count: {
        type: DataTypes.INTEGER
    }
}, {
    freezeTableName: true,
    timestamps: false
})

module.exports = orderItemModel