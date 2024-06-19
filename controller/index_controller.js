const { getinfo } = require('../service/index_service')

class indexController {
    async getinfo(req, res) {
        try {
            const data = await getinfo()
            
            // 初始化对象
            let tempData = {
                carousels: [
                    {
                        carouselUrl: "https://newbee-mall.oss-cn-beijing.aliyuncs.com/images/banner-mate60.png",
                        redirectUrl: "https://juejin.im/book/6844733826191589390"
                    },
                    {
                        carouselUrl: "https://newbee-mall.oss-cn-beijing.aliyuncs.com/images/banner-matex5.png",
                        redirectUrl: "https://juejin.im/book/6844733826191589390"
                    },
                    {
                        carouselUrl: "https://newbee-mall.oss-cn-beijing.aliyuncs.com/images/banner-p60-pro-white.png",
                        redirectUrl: "https://juejin.im/book/6844733826191589390"
                    }
                ],
                hotGoodses: [],
                newGoodses: [],
                recommendGoodses: []
            }

            // 循环放入三个区域
            for (let i = 3; i <= 5; i++) {
                let tempArr = []
                tempArr = data.filter(item => item.config_type === i).map(item => {
                    return {
                        goodsId: item.goods.goods_id,
                        goodsName: item.goods.goods_name,
                        goodsIntro: item.goods.goods_intro,
                        goodsCoverImg: item.goods.goods_cover_img,
                        sellingPrice: item.goods.selling_price,
                        tag: item.goods.tag
                    }
                })
                switch (i) {
                    case 3:
                        tempData.hotGoodses = tempArr
                        break
                    case 4:
                        tempData.newGoodses = tempArr
                        break
                    case 5:
                        tempData.recommendGoodses = tempArr
                        break
                }
            }

            res.resMessage(200, 'SUCCESS', tempData)
        } catch (err) {
            console.log(err);
            res.resMessage(400, err.name)
        }
    }
}

module.exports = new indexController()