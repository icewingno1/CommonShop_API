const cartModel = require('../model/cart_model')
const goodsModel = require('../model/goods_model')

const getCart = async ({ user_id }) => {
  const res = await cartModel.findAll({
    attributes: ['cart_item_id', 'goods_count', 'goods_id'],
    where: {
      user_id, // 根据用户输入的 userID 进行筛选
      is_deleted: 0
    },
    include: [{
      model: goodsModel,
      as: 'goods', // 使用之前定义的关联别名
      attributes: ['goods_name', 'goods_cover_img', 'selling_price']
    }]
  })
  return res
}

const findItem = async ({ user_id, goods_id }) => {
  const res = await cartModel.findOne({
    attributes: ['cart_item_id'],
    where: {
      user_id,
      goods_id,
      is_deleted: 0
    }
  })

  if (res) {
    return res
  } else {
    return 0
  }
}

const findItemByCartId = async ({ user_id, cart_item_id }) => {
  const res = await cartModel.findOne({
    attributes: ['cart_item_id', 'goods_count'],
    where: {
      cart_item_id,
      user_id, // 根据用户输入的 userID 进行筛选
      is_deleted: 0
    },
    include: [{
      model: goodsModel,
      as: 'goods', // 使用之前定义的关联别名
      attributes: ['goods_name', 'goods_cover_img', 'selling_price', 'goods_id']
    }]
  })
  return res
}

const addCart = async ({ goods_id, goods_count, user_id }) => {
  const res = await cartModel.create({ goods_id, goods_count, user_id })
  return res
}

const updateCart = async ({ goods_id, goods_count, cart_item_id }) => {
  const res = await cartModel.update({ goods_count }, {
    where: {
      goods_id,
      cart_item_id
    }
  })
  return res
}

const deleteCart = async ({ cart_item_id, user_id }) => {
  const res = await cartModel.update({ is_deleted: 1 }, {
    where: {
      user_id,
      cart_item_id
    }
  })
  return res
}

module.exports = {
  getCart,
  findItem,
  addCart,
  updateCart,
  deleteCart,
  findItemByCartId
}