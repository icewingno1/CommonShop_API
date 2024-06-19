const { getUser } = require('../service/user_service')
// 密码加密与比较
const bcrypptjs = require('bcryptjs')

// 加密中间件
exports.crpytPassword = async (req, res, next) => {
    const { password } = req.body
    // 加密密码
    let hash = bcrypptjs.hashSync(password, 10)
    // 覆盖原来的密码
    req.body.password = hash
    await next()
}

// 寻找账户
exports.verifyUser = async (req, res, next) => {
    const { login_name } = req.body

    if (getUser({ login_name })) {
        res.resMessage(400, '账号已存在')
        return
    }

    await next()
}