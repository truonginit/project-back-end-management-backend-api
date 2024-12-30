// model
const ProductModel = require('../models/product.model');
const BookModel = require('../models/book.model');
const StationeryModel = require('../models/stationery.model');

// core response
const { BadRequestError, NotFoundError } = require('../core/error.response');

// repo
const { 
    getAllProductByQuery, 
    getDetailProductBySlug, 
    getDetailProductById,
    updateOneProduct
} = require('../models/repositories/product.repo');

// utils
const { 
    parseObjectIdMongoose, 
    pickFieldInObject, 
    removeFieldNullOrUndefined 
} = require('../utils/index.util');

// class 
class Product {
    constructor({ name, desc, thumb, quantity, price, provider, type,
        accountId, // id của tài khoản tạo sản phẩm này 
        attributes,    
    }) {
        this.product_name             = name;
        this.product_description      = desc;
        this.product_thumb            = thumb;
        this.product_quantity         = quantity;
        this.product_price            = price;
        this.product_type             = type;
        this.accountId                = accountId;
        // this.productId = productId;
        this.product_attributes       = attributes;
    }

    /**
     * @description Tạo mới sản phẩm => thông tin chung của 1 sản phẩm
    */
    async createProduct ({ productId }) {
        // console.log('Class Product:::Func createBook:::', this);

        return await ProductModel.create({
            _id: parseObjectIdMongoose(productId),
            ...removeFieldNullOrUndefined(this)
        })
    }

    /**
     * @description Chỉnh sửa thông tin chung của 1 sản phẩm
     * @param {*} param0 
     * @return {JSON}
     */
    async updateOneProduct ({ productId }) {
        const payloadUpdate = {
            filter: { _id: parseObjectIdMongoose(productId) },
            update: removeFieldNullOrUndefined(this),
            options: { new: true }
        };

        // console.log('payload::',payloadUpdate);

        const updateProduct =  await updateOneProduct({ payload: payloadUpdate, model: ProductModel });

        // chỉ cần response lại các trường dữ liệu đã update
        return pickFieldInObject({object: updateProduct, field: Object.keys(this)});
    }
}

class Book extends Product{
    /**
     * @description tạo, lưu những thuộc tính (attributes) của sách 
    */
    async createProduct () {
        // console.log('Class Book:::Func createProduct:::', this);

        // Lưu những thuộc tính của Sách vào BookModel
        const newBook = await BookModel.create(this.attributes);

        if(!newBook) throw new BadRequestError(''); // tạo thất bại

        // Lưu những thông tin chung sản phẩm (sách) vào ProductModel
        const newProduct = await super.createProduct({ productId: newBook._id});

        // Response
        return newProduct;
    }

    /**
     * @description chỉnh sửa thuộc tính (attributes) của sách 
    */
    async updateOneProduct ({ productId }) {
        // update các thuộc tính của sản phẩm Sách
        const payloadUpdate = {
            filter: { _id: parseObjectIdMongoose(productId) },
            update: removeFieldNullOrUndefined(this.product_attributes),
            options: { new: true }
        };

        const updateBook = await updateOneProduct({ payload: payloadUpdate, model: BookModel });
        if(!updateBook) throw new BadRequestError('Chỉnh sửa sản phẩm thất bại');

        // update các thông tin của chung sản phẩm
        return await super.updateOneProduct({ productId });
    }
}

class Stationery extends Product {
    /**
     * @description tạo, lưu những thuộc tính (attributes) của văn phòng phẩm 
    */
    async createProduct () {
        // console.log('Class Stationery:::Func createProduct:::', this);

        // Lưu những thuộc tính của Sách vào StationeryModel
        const newStationery = await StationeryModel.create(this.product_attributes);

        if(!newStationery) throw new BadRequestError('Tạo sản phẩm mới thất bại'); // tạo thất bại

        // Lưu những thông tin chung sản phẩm (sách) vào ProductModel
        const newProduct = await super.createProduct({productId: newStationery._id});

        // Response
        return newProduct;
    }

    /**
     * @description chỉnh sửa thuộc tính (attributes) của văn phòng phẩm 
    */
    async updateOneProduct ({ productId }) {
        // update các thuộc tính của sản phẩm Sách
        const payloadUpdate = {
            filter: { _id: parseObjectIdMongoose(productId) },
            update: removeFieldNullOrUndefined(this.product_attributes),
            options: { new: true }
        };

        const updateBook = await updateOneProduct({ payload: payloadUpdate, model: StationeryModel });
        if(!updateBook) throw new BadRequestError('Chỉnh sửa sản phẩm thất bại');

        // update các thông tin của chung sản phẩm
        return await super.updateOneProduct({ productId });
    }
}

// service
/**
 * @description sử dụng Strategy Pattern
*/ 
class ProductFactoryService {

    /**
     * @description strategy factory là một object chứa các cặp key-class
     * @example: 'Book': Book
    */
    static factory = {};

    /**
     * @description Function này dùng cho việc khởi tạo Key-Class mà không phải mở code ra
     * @param {String} key 
     * @param {Class} classRef 
    */
    static addKeyClassIntoFactory = ({ key, classRef }) => {
        ProductFactoryService.factory[key] = classRef;
    }

    /**
     * @description Function này sẽ tạo sản phẩm 
     * @param {String} type giúp lấy ra class tương ứng với sản phẩm muốn tạo
     * @param {Object} payload 
     * @returns 
    */
    static createProduct = async ( {type, payload} ) => {
        // Lấy class của sản phẩm muốn tạo
        const classRef = ProductFactoryService.factory[type];
        if(!classRef) throw new NotFoundError('Không tìm thấy loại sản phẩm này');

        // console.log('classRef::', classRef);

        // Tạo mới
        return await new classRef(payload).createProduct();
    }

    /**
     * @description Lấy danh sách sản phẩm theo query
     * @param {String} status 
     * @param {Boolean} isDeleted 
    */
    static getAllProductByQuery = async({ status, isDeleted }) => {
        const unSelect = [''];
        return await getAllProductByQuery({ status, isDeleted });
    }

    /**
     * @description Lấy chi tiết sản phẩm theo slug
     * @param {String} slug 
     * @param {String} status 
     * @param {Array}  unSelect 
     * @return
    */
    static getDetailProductBySlug = async ({ params, query }) => {
        const { slug }   = params;
        const { status } = query;
        const unSelect = ['__v'];
        return await getDetailProductBySlug({ slug, status, unSelect });
    }

    /**
     * @description Thay đổi trạng thái của một sản phẩm
     * @param {String} productId 
     * @param {String} status 
     * @param {JSON} 
     */
    static changeStatusOfOneProduct = async ({ productId, status }) => {
        // Kiểm tra xem trạng thái từ FrontEnd gửi về có hợp lệ không
        const statusOfProduct = ['active', 'inactive', 'pending'];

        if(!statusOfProduct.includes(status)) throw new BadRequestError('Trạng thái không hợp lệ');

        const filter  = { _id: parseObjectIdMongoose(productId) };
        const update  = { product_status: status  };
        const options = { new: true, upsert: true };

        const product =  await ProductModel.findOneAndUpdate(filter, update, options);
        
        // field pick
        const fieldPick = [
            'product_name',
            'product_status'
        ];

        // response
        return pickFieldInObject({object: product, field: fieldPick});
    }

    /**
     * @description Xóa mềm một sản phẩm
     * @param {String} productId 
     * @return 
    */
    static deleteSoftOneProduct = async ({ productId }) => {
        // Kiểm tra xem có tồn tại sản phẩm này không
        const select = [
            'product_name',
            'product_status',
            'product_isDeleted'
        ];

        const foundProduct = await getDetailProductById({ productId, select, isLean: false });

        if(!foundProduct) throw new NotFoundError('Không tìm thấy sản phẩm này');

        foundProduct.product_status    = 'inactive';
        foundProduct.product_isDeleted = true;

        return await foundProduct.save();
    }

    static updateOneProduct = async ({ type, productId, payload }) => {
        // lấy class theo type của sản phẩm
        const classRef = ProductFactoryService.factory[type];
        if(!classRef) throw new NotFoundError('Không tìm thấy loại sản phẩm này');
        
        // console.log('payload:::', payload);
        return await new classRef(payload).updateOneProduct({ productId });
    }
}


/**
 * @description Thêm các key-class vào factory
 * @note các key ở đây chính là product_type
*/
ProductFactoryService.addKeyClassIntoFactory({key: 'Book', classRef: Book});
ProductFactoryService.addKeyClassIntoFactory({key: 'Stationery', classRef: Stationery});

// exports
module.exports = ProductFactoryService;