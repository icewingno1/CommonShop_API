module.exports = {
    jwtKey: 'ice_wing_no1',
    expiresIn: '1h'
}

// 解密toeken中间件
// const { expressjwt: jwt } = require('express-jwt')
// const jwtconfig = require('../jwtconfig')

// 解密token示例
// router.get('/test', jwt({ secret: jwtconfig.jwtKey, algorithms: ["HS256"] }), (req, res) => {
//     res.send('过了')
// })