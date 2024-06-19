const { DataTypes } = require('sequelize')

const seq = require('../db/seq')

// 外键及关联
const orderItemModel = require('./orderItem_model')

// 创建模型
const orderModel = seq.define('order_info', {
    order_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER
    },
    total_price: {
        type: DataTypes.FLOAT
    },
    pay_status: {
        type: DataTypes.TINYINT
    },
    pay_type: {
        type: DataTypes.TINYINT
    },
    order_status: {
        type: DataTypes.TINYINT
    },
    extra_info: {
        type: DataTypes.STRING(100)
    },
    is_deleted: {
        type: DataTypes.TINYINT
    },
    address_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    create_time: {
        type: DataTypes.DATE
    },
    pay_time: {
        type: DataTypes.DATE
    }
}, {
    freezeTableName: true,
    timestamps: false
})

orderModel.hasMany(orderItemModel, {
    foreignKey: 'order_id',
    sourceKey: 'order_id',
    as: 'orderItems'
})

module.exports = orderModel