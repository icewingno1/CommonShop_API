const { getCart, updateCart, addCart, deleteCart } = require('../service/cart_service')

class cartController {
    async getCart(req, res) {
        const { user_id } = req.auth

        // 数据库操作
        try {
            const data = await getCart({ user_id })
            let tempData = []
            // 数据处理
            tempData = data.map(item => {
                return {
                    cartItemId: item.cart_item_id,
                    goodsId: item.goods_id,
                    goodsCount: item.goods_count,
                    goodsName: item.goods.goods_name,
                    goodsCoverImg: item.goods.goods_cover_img,
                    sellingPrice: item.goods.selling_price
                }
            })

            return res.resMessage(200, 'SUCCESS', tempData)
        } catch (err) {
            return res.resMessage(400, err.name)
        }

    }

    async addCart(req, res) {
        const { goods_id, goods_count } = req.body
        const { user_id } = req.auth
        try {
            // 如果该账号购物车有该商品，则走添加逻辑
            if (res.hasCart) {
                // 从中间件获取cartItem
                const { cart_item_id } = res.hasCart
                await updateCart({ goods_id, goods_count, cart_item_id })
            } else {
                // 没有信息则走添加逻辑
                await addCart({ goods_id, goods_count, user_id })
                rt({ goods_id, goods_count, user_id })
            }
            return res.resMessage(200, 'SUCCESS')
        } catch (err) {
            return res.resMessage(400, err.name)
        }
    }

    async deleteCart(req, res) {
        console.log(req.params);
        const { cart_item_id } = req.params
        const { user_id } = req.auth

        try {
            await deleteCart({ cart_item_id, user_id })
            return res.resMessage(200, 'SUCCESS')
        } catch (err) {
            return res.resMessage(400, err.name)
        }
    }
}

module.exports = new cartController()