/**
 * @description Book model là collection chứa các thông tin thuộc tính của sách
*/

// require package
const mongoose = require('mongoose');
const slugify  = require('slugify');

// Document Name và Collection Name
const DOCUMENT_NAME   = 'Role';
const COLLECTION_NAME = 'roles'; 

// Khai báo schema
const roleSchema = new mongoose.Schema({
    // _id này mongoose sẽ tự generate ra và dùng _id này để tạo sản phẩm

    role_name: { type: String, required: true },
    role_description: { type: String, required: true },
    role_status: { type: String, default: 'inactive', enum: ['active', 'inactive'] },
    role_isDeleted: { type: Boolean, default: false},
    role_accountId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Account' }, // tài khoản tạo role này
    role_slug: { type: String }, // giúp tìm kiếm trong database dễ dàng hơn, lưu ý cái này không phải sản phẩm nền không cần random string phía sau

    // ########## PHÂN QUYỀN ########## //
    /**
        role_permissions: [
            "account_view",     // xem được danh sách, chi tiết tài khoản quản trị
            "account_create",   // được phép tạo tài khoản quản trị
            "account_update",   // được chỉnh sửa (thay đổi) các field của tài khoản quản trị
            "account_delete",   // được xóa tài khoản quản trị
            ...
        ]
    */
    role_permissions: { 
        type: Array, 
        default: [
            // mặc định sẽ có quyền xem (view)
            'book_view',    // quyền xem trang quản lý sách
            'stationery',   // quyền xem trang quản lý vật tư văn phòng
            'category_view',
            'account_view',
            'role_view'
        ] 
    }
},{
    timestamps: true
});

// pre-hook: trước khi create, save document thì nó sẽ chạy vào đây => tạo slug cho nhóm quyền
roleSchema.pre('save', function( next ) {
    this.role_slug = slugify(this.role_name, { lower: true });
    next();
});

// roleSchema.pre('findOneAndUpdate', function( next ) {
//     this.role_slug = slugify(this.role_name, { lower: true });
//     next();
// });

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, roleSchema, COLLECTION_NAME);