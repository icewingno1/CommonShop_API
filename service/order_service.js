const orderModel = require('../model/order_model')
const orderItemModel = require('../model/orderItem_model')
const sequelize = require('sequelize');

// 创建空订单
const createOrder = async ({ user_id, address_id }) => {
    const { order_id } = await orderModel.create({ user_id, address_id })
    return order_id
}

// 更新订单总价
const updateOrderPrice = async ({ order_id, total_price }) => {
    const res = await orderModel.update({ total_price }, {
        where: {
            order_id
        }
    })
    return res
}

// 计算每个订单下属商品总价
const getOrderPrice = async ({ order_id }) => {
    const res = orderItemModel.findOne({
        where: {
            order_id
        },
        attributes: [
            [sequelize.fn('SUM', sequelize.literal('goods_count * selling_price')), 'total_price']
        ],
        raw: true
    })
    return res
}

// 在空订单中插入商品项
const insertOrder = async ({ order_id, cartItemData }) => {
    const { goods_count, goods: { goods_name, goods_cover_img, selling_price, goods_id } } = cartItemData
    // 为该订单创建一个下属项
    await orderItemModel.create({ order_id, goods_id, selling_price, goods_count, goods_name, goods_cover_img })
}

const getOrderList = async ({ user_id }) => {
    const res = await orderModel.findAll({
        where: { user_id },
        attributes: ['order_id', 'order_status', 'pay_type', 'total_price', 'create_time'],
        include: [{
            model: orderItemModel,
            as: 'orderItems',
            attributes: ['goods_count', 'goods_cover_img', 'goods_id', 'goods_name', 'selling_price'],
        }]
    })
    return res
}

const getOrderListByStatus = async ({ user_id, order_status }) => {
    const res = await orderModel.findAll({
        where: { user_id, order_status },
        attributes: ['order_id', 'order_status', 'pay_type', 'total_price', 'create_time'],
        include: [{
            model: orderItemModel,
            as: 'orderItems',
            attributes: ['goods_count', 'goods_cover_img', 'goods_id', 'goods_name', 'selling_price'],
        }]
    })
    return res
}

const getOrderDetail = async ({ user_id, order_id }) => {
    const res = await orderModel.findOne({
        where: { user_id, order_id },
        attributes: ['order_id', 'order_status', 'pay_type', 'total_price', 'create_time', 'pay_time', 'pay_status'],
        include: [{
            model: orderItemModel,
            as: 'orderItems',
            attributes: ['goods_count', 'goods_cover_img', 'goods_id', 'goods_name', 'selling_price'],
        }]
    })
    return res
}

const cancelOrderByUser = async ({ user_id, order_id }) => {
    const res = await orderModel.update({ order_status: -1 }, {
        where: {
            user_id,
            order_id
        }
    })
    return res
}

// 确认收货
const finshOrderByUser = async ({ user_id, order_id }) => {
    const res = await orderModel.update({ order_status: 4 }, {
        where: {
            user_id,
            order_id
        }
    })
    return res
}

// 已支付
const TypePay = async ({ user_id, order_id }) => {
    const res = await orderModel.update({ order_status: 1 }, {
        where: {
            user_id,
            order_id
        }
    })
    return res
}

// 模拟支付
const payOrder = async ({ user_id, order_id, pay_type }) => {
    const res = await orderModel.update({ pay_type }, {
        where: {
            user_id,
            order_id
        }
    })
    return res
}

module.exports = {
    createOrder,
    insertOrder,
    updateOrderPrice,
    getOrderPrice,
    getOrderList,
    getOrderDetail,
    cancelOrderByUser,
    finshOrderByUser,
    payOrder,
    TypePay,
    getOrderListByStatus
}