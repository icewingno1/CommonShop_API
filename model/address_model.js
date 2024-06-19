const { DataTypes } = require('sequelize')

const seq = require('../db/seq')

// 创建模型
const addressModel = seq.define('address_info', {
    address_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    user_name: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    user_phone: {
        type: DataTypes.STRING(11),
        allowNull: false
    },
    province_name: {
        type: DataTypes.STRING(32),
        allowNull: false
    },
    city_name: {
        type: DataTypes.STRING(32),
        allowNull: false
    },
    region_name: {
        type: DataTypes.STRING(32),
        allowNull: false
    },
    detail_address: {
        type: DataTypes.STRING(64),
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    default_flag: {
        type: DataTypes.TINYINT
    },
}, {
    freezeTableName: true,
    timestamps: false
})

module.exports = addressModel