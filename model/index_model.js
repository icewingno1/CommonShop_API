const { DataTypes } = require('sequelize')

// 定义外键以及关联
const goodsModel = require('./goods_model')

const seq = require('../db/seq')

// 创建模型
const indexModel = seq.define('index_config', {
    config_id: {
        type: DataTypes.BIGINT,
        primaryKey: true
    },
    config_name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    config_type: {
        type: DataTypes.TINYINT,
        allowNull: false
    },
    goods_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        references: {
            model: goodsModel,
            key: 'goods_id',
        }
    },
    redirect_url: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    config_rank: {
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
    }
}, {
    freezeTableName: true,
    timestamps: false
})

indexModel.belongsTo(goodsModel, {
    foreignKey: 'goods_id', // 指定外键  
    targetKey: 'goods_id', // 如果 goodsModel 的主键不是 goods_id，则需要指定
    as: 'goods' // 为关联指定一个别名，以便在查询时引用
})

module.exports = indexModel