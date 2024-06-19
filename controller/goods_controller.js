const { getDetail, getListByKW, getListByID } = require('../service/goods_service')

class goodsController {
    async getList(req, res) {
        // 解构query参数
        const { keyword, goodsCategoryId } = req.query

        try {
            let data = []
            // 数据库
            if (keyword) {
                data = await getListByKW({ keyword })
            } else if (goodsCategoryId) {
                data = await getListByID({ category_id: goodsCategoryId })
            }

            // 数据处理
            let tempData = []
            tempData = data.map(item => {
                return {
                    goodsCoverImg: item.goods_cover_img,
                    goodsId: item.goods_id,
                    goodsIntro: item.goods_intro,
                    goodsName: item.goods_name,
                    sellingPrice: item.selling_price
                }
            })

            res.resMessage(200, 'SUCCESS', tempData)
        } catch (err) {
            res.resMessage(400, err)
        }

    }

    async getDetail(req, res) {
        const { goods_id } = req.params
        // 数据库操作
        try {
            const data = await getDetail({ goods_id })

            let tempData = {
                goodsCarouselList: [data.goods_carousel],
                goodsCoverImg: data.goods_cover_img,
                goodsDetailContent: data.goods_detail_content,
                goodsId: data.goods_id,
                goodsIntro: data.goods_intro,
                goodsName: data.goods_name,
                originalPrice: data.original_price,
                sellingPrice: data.selling_price,
                tag: data.tag
            }
            res.resMessage(200, 'SUCCESS', tempData)
        } catch (err) {
            res.resMessage(400, err.name)
        }

    }
}

module.exports = new goodsController()