const categoriesModel = require('../model/categories_model')

const getCategories = async () => {
    const res = await categoriesModel.findAll()
    return res
}

module.exports = {
    getCategories
}