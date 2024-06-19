const userModel = require('../model/user_model')
const bcrypptjs = require('bcryptjs')

// token
const jwt = require('jsonwebtoken')
const jwtconfig = require('../jwtconfig')

const createUser = async ({login_name, password}) => {
    // 操作数据库
    const res = await userModel.create({ login_name, password, nick_name: login_name, user_intro: "测试11111" })
    return res.dataValues
}

const loginUser = async ({ login_name, password }) => {
    const account = await getUser({ login_name })
    // 检查是否有账户以及密码是否正确，由于有短路所以没有账号时候不会执行后面
    if (!account || !bcrypptjs.compareSync(password, account.password)) {
        throw 0
    }

    // 生成TOKEN，剔除不必要的信息
    const user = { ...account, password: '', useravatar: '' }
    const tokenStr = jwt.sign(user, jwtconfig.jwtKey, { expiresIn: jwtconfig.expiresIn })
    return 'Bearer ' + tokenStr
}

const getUser = async ({ user_id, login_name }) => {
    let whereObj = {}

    user_id && Object.assign(whereObj, { user_id })
    login_name && Object.assign(whereObj, { login_name })

    const res = await userModel.findOne({
        attributes: ['user_id', 'login_name', 'nick_name', 'user_intro', 'user_avatar', 'password'],
        where: whereObj
    })

    // 找到返回对象，未找到返回0
    return res ? res.dataValues : 0
}

module.exports = {
    createUser,
    loginUser,
    getUser
}