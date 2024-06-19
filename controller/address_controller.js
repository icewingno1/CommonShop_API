const { getAddress, getAddressDetail, addAddress, updateDefault, updateAddress, deleteAddress, getDefaultAddress } = require('../service/address_service')

class addressController {
    async getAddress(req, res) {
        const { user_id } = req.auth
        // 数据库操作
        try {
            const data = await getAddress({ user_id })
            let tempData = []
            // 数据处理
            tempData = data.map(item => {
                return {
                    addressId: item.address_id,
                    userId: item.userId,
                    userName: item.user_name,
                    userPhone: item.user_phone,
                    defaultFlag: item.default_flag,
                    provinceName: item.province_name,
                    cityName: item.city_name,
                    regionName: item.region_name,
                    detailAddress: item.detail_address
                }
            })
            return res.resMessage(200, 'SUCCESS', tempData)
        } catch (err) {
            return res.resMessage(400, err.name)
        }
    }

    async getAddressDetail(req, res) {
        const { user_id } = req.auth
        const { address_id } = req.params
        try {
            const data = await getAddressDetail({ user_id, address_id })
            let tempData = {}
            // 数据处理
            tempData.addressId = data.address_id
            tempData.cityName = data.city_name
            tempData.defaultFlag = data.default_flag
            tempData.detailAddress = data.detail_address
            tempData.provinceName = data.province_name
            tempData.regionName = data.region_name
            tempData.userId = data.userId
            tempData.userName = data.user_name
            tempData.userPhone = data.user_phone

            return res.resMessage(200, 'SUCCESS', tempData)
        } catch (err) {
            return res.resMessage(400, err.name)
        }
    }

    async addAddress(req, res) {
        const { user_id } = req.auth
        const { user_name, user_phone, province_name, city_name, region_name, detail_address, default_flag } = req.body

        // 需要先判断新增是否选择默认，若选择默认需要将该用户名下所有地址先置为0
        if (default_flag === 1) {
            try {
                await updateDefault({ user_id })
            } catch (err) {
                return res.resMessage(400, err.name)
            }
        }

        try {
            await addAddress({ user_id, user_name, user_phone, province_name, city_name, region_name, detail_address, default_flag })
            return res.resMessage(200, 'SUCCESS')
        } catch (err) {
            return res.resMessage(400, err.name)
        }
    }

    async updateAddress(req, res) {
        const { user_id } = req.auth
        const { user_name, user_phone, province_name, city_name, region_name, detail_address, default_flag, address_id } = req.body

        // 需要先判断新增是否选择默认，若选择默认需要将该用户名下所有地址先置为0
        if (default_flag === 1) {
            try {
                await updateDefault({ user_id })
            } catch (err) {
                return res.resMessage(400, err.name)
            }
        }

        try {
            await updateAddress({ user_id, user_name, user_phone, province_name, city_name, region_name, detail_address, default_flag, address_id })
            return res.resMessage(200, 'SUCCESS')
        } catch (err) {
            return res.resMessage(400, err.name)
        }
    }

    async deleteAddress(req, res) {
        const { user_id } = req.auth
        const { address_id } = req.params

        try {
            await deleteAddress({ user_id, address_id })
            return res.resMessage(200, 'SUCCESS')
        } catch (err) {
            return res.resMessage(400, err.name)
        }
    }

    async getDefaultAddress(req, res) {
        const { user_id } = req.auth
        try {
            const data = await getDefaultAddress({ user_id })
            let tempData = {}

            tempData.addressId = data.address_id
            tempData.cityName = data.city_name
            tempData.isDeleted = data.default_flag
            tempData.detailAddress = data.detail_address
            tempData.provinceName = data.province_name
            tempData.regionName = data.region_name
            tempData.userId = data.userId
            tempData.userName = data.user_name
            tempData.userPhone = data.user_phone

            return res.resMessage(200, 'SUCCESS', tempData)
        } catch (err) {
            return res.resMessage(400, err.name)
        }
    }
}

module.exports = new addressController()