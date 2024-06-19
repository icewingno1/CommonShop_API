const { DataTypes } = require('sequelize')

const seq = require('../db/seq')

// 创建模型
const goodsModel = seq.define('goods_info', {
    goods_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true
    },
    goods_name: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    goods_intro: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    category_id: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    goods_cover_img: {
        type: DataTypes.STRING(200),
    },
    goods_carousel: {
        type: DataTypes.STRING(500),
    },
    goods_detail_content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    original_price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    selling_price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    stock_num: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    tag: {
        type: DataTypes.STRING(20)
    },
    goods_sell_status: {
        type: DataTypes.BOOLEAN
    },
    create_user: {
        type: DataTypes.INTEGER
    },
    update_user: {
        type: DataTypes.INTEGER
    }
}, {
    freezeTableName: true,
    timestamps: false
})

module.exports = goodsModel