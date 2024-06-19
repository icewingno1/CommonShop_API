const { DataTypes } = require('sequelize')

const seq = require('../db/seq')

// 创建模型
const categoriesModel = seq.define('goods_category', {
    category_id: {
        type: DataTypes.BIGINT,
        primaryKey: true
    },
    category_level: {
        type: DataTypes.TINYINT
    },
    parent_id: {
        type: DataTypes.BIGINT
    },
    category_name: {
        type: DataTypes.STRING(50)
    },
    category_rank: {
        type: DataTypes.INTEGER
    },
    is_deleted: {
        type: DataTypes.BOOLEAN
    },
    create_user: {
        type: DataTypes.INTEGER
    },
    update_user: {
        type: DataTypes.INTEGER
    },
    category_img: {
        type: DataTypes.STRING(100)
    }
}, {
    freezeTableName: true,
    timestamps: false
})

module.exports = categoriesModel