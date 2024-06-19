const { DataTypes } = require('sequelize')

// 定义外键以及关联
const goodsModel = require('./goods_model')
const userModel = require('./user_model')

const seq = require('../db/seq')

// 创建模型
const cartModel = seq.define('cart_item', {
    cart_item_id: {
        type: DataTypes.BIGINT,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: userModel,
            key: 'user_id',
        }
    },
    goods_id: {
        type: DataTypes.BIGINT,
        references: {
            model: goodsModel,
            key: 'goods_id',
        }
    },
    goods_count: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    is_deleted: {
        type: DataTypes.BOOLEAN
    },
}, {
    freezeTableName: true,
    timestamps: false
})

module.exports = cartModel

cartModel.belongsTo(goodsModel, {
    foreignKey: 'goods_id', // 指定外键  
    targetKey: 'goods_id', // 如果 goodsModel 的主键不是 goods_id，则需要指定
    as: 'goods' // 为关联指定一个别名，以便在查询时引用
})

cartModel.belongsTo(userModel, {
    foreignKey: 'user_id', // 指定外键  
    targetKey: 'user_id', // 如果 goodsModel 的主键不是 goods_id，则需要指定
    as: 'user' // 为关联指定一个别名，以便在查询时引用
})