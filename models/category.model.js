/**
 * @description Category model là collection chứa các thông tin về danh mục của các sản phẩm (thể loại hiểu vậy cũng được)
*/

// require package
const mongoose = require('mongoose');
const slugify = require('slugify');

// Document Name và Collection Name
const DOCUMENT_NAME   = 'Category';
const COLLECTION_NAME = 'categories'; 

// Khai báo schema
const categorySchema = new mongoose.Schema({
    
    // _id của sản phẩm sẽ lấy từ các _id của Schema Attribute

    // id danh mục cha
    category_parent_categoryId: { 
        // type: mongoose.Schema.Types.ObjectId,
        type: String,
        ref: 'Category'
    }, 

    category_name: { type: String, required: true },
    category_description: { type: String, required: true },
    category_thumb: { type: String, required: true }, // hình ảnh của danh mục, chỉ cần 1 ảnh chính là đủ
    category_slug : { type: String }, // lưu ý khi dùng pre-hook thì không nên để required: true ở đây
    
    category_count_products: { type: Number, default: 0 }, // số lượng sản phẩm thuộc về danh mục này, không cần required vì khi vừa tạo có sản phẩm nào đâu

    category_status: { 
        type: String, 
        required: true, 
        default: 'pending',
        enum: ['active', 'inactive', 'pending'],
    },

    category_isDeleted: { type: Boolean, default: false, select: false },
    
    category_accountId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' }, // accountId của người tạo ra danh mục này
    
    // loại danh mục => cái này sẽ hỗ trợ cho việc query
    // category_type: { 
    //     type: String, 
    //     required: true,
    //     // enum: ['Book', 'Stationery'] // không nên để cái này
    // },
},{
    timestamps: true
});

// pre-hook: trước khi create, save document thì nó sẽ chạy vào đây => tạo slug cho sản phẩm
categorySchema.pre('save', function( next ) {
    this.category_slug = slugify(this.category_name, { lower: true }) + '-' + Date.now();
    next();
});

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, categorySchema, COLLECTION_NAME);