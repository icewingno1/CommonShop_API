const { createUser, getUser, loginUser } = require('../service/user_service')

class userController {
    async register(req, res) {
        // 解构用户输入的参数
        const { login_name, password } = req.body

        // 数据库操作
        try {
            const newData = await createUser({ login_name, password })
            return res.resMessage(200, '注册成功')
        } catch (err) {
            return res.resMessage(400, err.name)
        }
    }

    async login(req, res) {
        // 解构用户输入的参数
        const { login_name, password } = req.body

        try {
            const data = await loginUser({ login_name, password })
            return res.resMessage(200, '登录成功', data)
        } catch {
            return res.resMessage(400, "账号或密码错误")
        }
    }

    async info(req, res) {
        const searchObj = req.auth

        let tempData = {
            introduceSign: searchObj.user_intro,
            loginName: searchObj.login_name,
            nickName: searchObj.nick_name
        }

        return res.resMessage(200, 'SUCCESS', tempData)
    }
}

module.exports = new userController()