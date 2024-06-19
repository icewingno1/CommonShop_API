const { getCategories } = require('../service/categories_service')

class categoriesController {
    async getCategories(req, res) {
        // 数据库操作
        try {
            const data = await getCategories()

            // 数据处理
            let tempData = []
            // 处理一级分类
            tempData = data.filter(item => item.category_level === 1).map(
                item => ({
                    categoryId: item.category_id,
                    categoryLevel: item.category_level,
                    categoryName: item.category_name,
                    parentId: item.parent_id,
                    secondLevelCategoryVOS: [] // 初始化为空数组
                }))
            // 处理二级分类
            tempData.forEach(item => {
                item.secondLevelCategoryVOS = data.filter(item1 => item1.category_level === 2).filter(item2 => item2.parent_id === item.categoryId).map(
                    subItem => ({
                        categoryId: subItem.category_id,
                        categoryLevel: subItem.category_level,
                        categoryName: subItem.category_name,
                        categoryImg: subItem.category_img,
                        parentId: subItem.parent_id,
                    })
                )
            })

            return res.resMessage(200, 'SUCCESS', tempData)
        } catch (err) {
            return res.resMessage(400, err.name)
        }
    }
}

module.exports = new categoriesController()