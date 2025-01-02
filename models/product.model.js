/**
 * @description Product model là collection chứa các thông tin chung về các sản phẩm
*/

// require package
const mongoose = require('mongoose');
const slugify = require('slugify');

// Document Name và Collection Name
const DOCUMENT_NAME   = 'Product';
const COLLECTION_NAME = 'products'; 

// Khai báo schema
const productSchema = new mongoose.Schema({
    
    // _id của sản phẩm sẽ lấy từ các _id của Schema Attribute
    product_categoryId: { type: mongoose.Types.ObjectId, ref: 'Category'}, // ID của danh mục mà sản phẩm này thuộc về
     
    product_name: { type: String, required: true },
    product_description: { type: String, required: true },
    product_thumb: { type: Array, default: [] }, // hình ảnh của sản phẩm
    product_quantity: { type: Number, required: true }, // số lượng của sản phẩm
    product_slug : { type: String },

    product_price: { type: Number, required: true },
    
    product_status: { 
        type: String, 
        required: true, 
        default: 'pending',
        enum: ['active', 'inactive', 'pending'],
    },

    product_isDeleted: { type: Boolean, default: false, select: false },
    
    product_accountId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
    
    // loại sản phẩm => cái này sẽ hỗ trợ cho việc query
    product_type: { 
        type: String, 
        required: true,
        // enum: ['Book', 'Stationery']
    },

    // thuộc tính của sản phẩm
    /**
     * @example: Attribute Sách (Book)
        product_attributes: {
            author: Tác giả 
            cover : loại bìa (bìa cứng, bìa mềm)
            lang  : ngôn ngữ
        }
    */

    /**
     * @example: Attribute văn phòng phẩm (Stationery)
        product_attributes: {
            brand : Thương hiệu
            madeIn: Nơi sản xuất 
            color : Màu sắc
        }
    */
    product_attributes: { type: mongoose.Schema.Types.Mixed, required: true },
},{
    timestamps: true
});

// pre-hook: trước khi create, save document thì nó sẽ chạy vào đây => tạo slug cho sản phẩm
productSchema.pre('save', function( next ) {
    this.product_slug = slugify(this.product_name, { lower: true }) + '-' + Date.now();
    next();
});

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, productSchema, COLLECTION_NAME);