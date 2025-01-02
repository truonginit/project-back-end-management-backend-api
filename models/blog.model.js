/**
 * @description Article model là collection chứa các thông tin về bài viết
 * Ứng dụng cho user viết các bài viết đánh giá sách 
*/

// require package
const mongoose = require('mongoose');
const slugify = require('slugify');

// Document Name và Collection Name
const DOCUMENT_NAME   = 'Blog';
const COLLECTION_NAME = 'blogs'; 

// Khai báo schema
const blogchema = new mongoose.Schema({     
    // blog_by: { type: String, required: true, enum: ['client', 'admin']}, // xác định tài khoản đăng bài
    blog_category: { type: String }, // danh mục cho bài viết, có thể là review, chia sẽ, ...
    blog_name: { type: String, required: true },
    blog_slug : { type: String },

    blog_content: { type: String, required: true }, // nội dung của bài viết
    blog_thumb: { type: Array, default: [] }, // hình ảnh của bài viết (hình ảnh trong phần content)
    
    blog_status: { 
        type: String, 
        required: true, 
        default: 'pending', // chờ được duyệt hoặc bỏ cái này cũng được
        enum: ['active', 'inactive', 'pending'],
    },

    blog_isDeleted: { type: Boolean, default: false, select: false },

    //  ################## BÀI VIẾT NÀY ĐƯỢC TẠO BỞI ################## //
    // blog_ById: { 
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: function() {
    //         return this.blog_by === 'client' ? 'User' : 'Account';
    //     }
    // } multi reference

    bloug_byId: { type: mongoose.Schema.Types.ObjectId }    
},{
    timestamps: true
});

// pre-hook: trước khi create, save document thì nó sẽ chạy vào đây => tạo slug cho bài viết
blogchema.pre('save', function( next ) {
    this.blog_slug = slugify(this.blog_name, { lower: true }) + '-' + Date.now();
    next();
});

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, blogchema, COLLECTION_NAME);