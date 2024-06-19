const { findItem } = require('../service/cart_service')

// 寻找是否有购物车项
exports.verifyItem = async (req, res, next) => {
    const { goods_id } = req.body
    const { user_id } = req.auth
    res.hasCart = await findItem({ user_id, goods_id })

    await next()
}