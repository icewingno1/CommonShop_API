const { createOrder, insertOrder, getOrderPrice, updateOrderPrice, getOrderList, getOrderDetail, cancelOrderByUser, finshOrderByUser, payOrder, TypePay, getOrderListByStatus } = require('../service/order_service')
const { findItemByCartId, deleteCart } = require('../service/cart_service')

const orderStatusMap = {
    '0': '待支付',
    '1': '已支付',
    '2': '配货完成',
    '3': '出库成功',
    '4': '交易成功',
    '-1': '手动关闭',
    '-2': '超时关闭',
    '-3': '商家关闭'
}

class orderController {

    async createOrder(req, res) {
        const { user_id } = req.auth
        const { address_id, cartItemIds } = req.body

        try {
            // 创建一个空订单，获取当前订单号，为后续插入做准备
            const order_id = await createOrder({ user_id, address_id })

            for (let i = 0; i < cartItemIds.length; i++) {
                // 遍历查询每一个用户传入的cart_item_id，然后将数据插入订单中，同时将该项deleted置为1
                const data = await findItemByCartId({ user_id, cart_item_id: cartItemIds[i] })
                // 如果找得到数据，插入到订单中
                if (data) {
                    await insertOrder({ order_id, cartItemData: data })
                } else {
                    return res.resMessage(400, '购物车项错误')
                }
                // 每次插入完后删除购物车项
                await deleteCart({ user_id, cart_item_id: cartItemIds[i] })
            }

            // 整体插入完后更新总价
            const { total_price } = await getOrderPrice({ order_id })
            // 更新订单总额
            await updateOrderPrice({ order_id, total_price })

            return res.resMessage(200, 'SUCCESS', order_id)
        } catch (err) {
            return res.resMessage(400, err.name)
        }

    }

    async getOrderList(req, res) {
        const { user_id } = req.auth
        const { order_status } = req.query
        let data = []

        try {
            // 数据库操作
            if (order_status) {
                data = await getOrderListByStatus({ user_id, order_status })
            } else {
                data = await getOrderList({ user_id })
            }

            let tempData = data.map(order => {
                return {
                    createTime: order.create_time,
                    newBeeMallOrderItemVOS: order.orderItems.map(item => ({
                        goodsCount: item.goods_count,
                        goodsCoverImg: item.goods_cover_img,
                        goodsId: item.goods_id,
                        goodsName: item.goods_name,
                        sellingPrice: item.selling_price
                    })),
                    orderId: order.order_id,
                    orderStatus: order.order_status,
                    orderStatusString: orderStatusMap[order.order_status],
                    payType: order.pay_type,
                    totalPrice: order.total_price
                }
            })
            res.resMessage(200, 'SUCCESS', tempData)
        } catch (err) {
            return res.resMessage(400, err.name)
        }
    }

    async getOrderDetail(req, res) {
        const { user_id } = req.auth
        const { order_id } = req.params

        try {
            const data = await getOrderDetail({ user_id, order_id })
            // 数据处理
            let tempData = {
                newBeeMallOrderItemVOS: data.orderItems.map(item => {
                    return {
                        goodsCount: item.goods_count,
                        goodsCoverImg: item.goods_cover_img,
                        goodsId: item.goods_id,
                        goodsName: item.goods_name,
                        sellingPrice: item.selling_price
                    }
                }),
                orderStatus: data.order_status,
                orderStatusString: orderStatusMap[data.order_status],
                payStatus: data.pay_status,
                payTime: data.pay_time,
                payType: data.pay_type,
                totalPrice: data.total_price,
                createTime: data.create_time
            }
            res.resMessage(200, 'SUCCESS', tempData)
        } catch (err) {
            return res.resMessage(400, err.name)
        }
    }

    async cancelOrderByUser(req, res) {
        const { user_id } = req.auth
        const { order_id } = req.params
        try {
            await cancelOrderByUser({ user_id, order_id })
            return res.resMessage(200, 'SUCCESS')
        } catch (err) {
            return res.resMessage(400, err.name)
        }
    }

    async finshOrderByUser(req, res) {
        const { user_id } = req.auth
        const { order_id } = req.params
        try {
            await finshOrderByUser({ user_id, order_id })
            return res.resMessage(200, 'SUCCESS')
        } catch (err) {
            return res.resMessage(400, err.name)
        }
    }

    async payOrder(req, res) {
        const { user_id } = req.auth
        const { order_id, pay_type } = req.query
        try {
            await payOrder({ user_id, order_id, pay_type })
            await TypePay({ user_id, order_id })
            return res.resMessage(200, 'SUCCESS')
        } catch (err) {
            return res.resMessage(400, err.name)
        }
    }
}

module.exports = new orderController()