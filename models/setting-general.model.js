/**
 * @description Setting General model là collection dùng để cài đặt các cái như là Logo, Tên, Địa chỉ, Email, Số điện thoại, ... thông tin chung của trang web
*/

// require package
const { required } = require('joi');
const mongoose = require('mongoose');

// Document Name và Collection Name
const DOCUMENT_NAME   = 'SettingGeneral';
const COLLECTION_NAME = 'setting-general'; 

// Khai báo schema
const settingGeneralSchema = new mongoose.Schema({
    website_name: { type: String, required: true },
    website_logo: { type: String, required: true },
    website_email: { type: String, required: true },
    website_fax:   { type: String, required: true},     // số điện thoại bàn
    website_copyright: { type: String, required: true },
    // website_social: [
    //     {
    //         facebook:   String,
    //         instagram:  String,
    //         youtobe:    String,
    //     }
    // ],
    website_address: [
        {   
            city:       { type: String, required: true  },  // chi nhánh / thành phố
            street:     { type: String, required : true },  // đường
            ward:       { type: String, required: true  },  // phường
            district:   { type: String, required: true  },  // quận
            tel:        { type: String, required: true  }   // số điện thoại của chi nhánh / thành phố
            /**
             * @vídụ

                [
                    {
                        city: 'Hồ Chí Minh',
                        street: 'Điện Biên Phủ',
                        ward: '15',
                        district: 'Bình Thạnh'
                    },

                    {
                        city: 'Hà Nội',
                        street: 'Điện Biên Phủ',
                        ward: '15',
                        district: 'Cầu Giấy'
                    }
                ]
            */
        }
    ]
},{
    timestamps: true
});

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, settingGeneralSchema, COLLECTION_NAME);