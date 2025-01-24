// model
const SettingGeneralModel = require('../models/setting-general.model');

// repo
const { 
    createNewInfo,
    updateInfo
} = require('../models/repositories/setting-general.repo');

// service
class SettingGeneralService {
    static settingAllInfo = async ({ name, logo, email, fax, copyright, address }) => {
        // 1.Lấy bản ghi cũ (nếu có)
        const foundInfo = await SettingGeneralModel.find({});
        console.log(`foundInfo::`, foundInfo);
        // nếu chưa có => tạo mới bản ghi
        if(foundInfo.length === 0) return await createNewInfo({ name, logo, email, fax, copyright, address });

        // nếu có => cập nhật
        return await updateInfo(foundInfo, { name, logo, email, fax, copyright, address });
    }
}

// exports
module.exports = SettingGeneralService;