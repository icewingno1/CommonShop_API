const { DataTypes } = require('sequelize')

const seq = require('../db/seq')

// 创建模型
const userModel = seq.define('user_info', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    nick_name: {
        type: DataTypes.STRING(50)
    },
    login_name: {
        type: DataTypes.STRING(11),
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    user_intro: {
        type: DataTypes.STRING(100)
    },
    is_delete: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
    },
    user_avatar: {
        type: DataTypes.TEXT
    }
}, {
    freezeTableName: true,
    timestamps: false
})

module.exports = userModel