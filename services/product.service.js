// model
const ProductModel = require('../models/product.model');
const BookModel = require('../models/book.model');
const StationeryModel = require('../models/stationery.model');

// core response
const { BadRequestError } = require('../core/error.response');

// class 
class Product {
    constructor({ 
        name,
        desc, 
        thumb, 
        quantity,
        price, 
        provider, 
        type,
        productId, // id document Book vừa được tạo (tức bản ghi attributes)
        attributes, 
    }) {
        this.name      = name;
        this.desc      = desc;
        this.thumb     = thumb;
        this.quantity  = quantity;
        this.price     = price;
        this.provider  = provider;
        this.type      = type;
        this.productId = productId;
        this.attributes = attributes;
    }

    /**
     * @description Tạo mới sản phẩm => thông tin chung của 1 sản phẩm
    */
    async createProduct () {
        // console.log('Class Product:::Func createBook:::', this);

        return await ProductModel.create({
            _id: this.productId,
            product_name: this.name,
            product_description: this.desc,
            product_thumb: this.thumb,
            product_quantity: this.quantity,
            product_price: this.price,
            product_provider: this.provider,
            product_type: this.type,
            product_attributes: this.attributes,
            product_slug: this.name
        })
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

        this.productId = newBook._id; // sử dụng id

        if(!newBook) throw new BadRequestError(''); // tạo thất bại

        // Lưu những thông tin chung sản phẩm (sách) vào ProductModel
        const newProduct = await super.createProduct();

        // Response
        return newProduct;
    }
}

class Stationery extends Product {
    /**
     * @description tạo, lưu những thuộc tính (attributes) của văn phòng phẩm 
    */
    async createProduct () {
        console.log('Class Stationery:::Func createProduct:::', this);

        // Lưu những thuộc tính của Sách vào StationeryModel
        const newStationery = await StationeryModel.create(this.attributes);

        this.productId = newStationery._id; // sử dụng id

        if(!newStationery) throw new BadRequestError(''); // tạo thất bại

        // Lưu những thông tin chung sản phẩm (sách) vào ProductModel
        const newProduct = await super.createProduct();

        // Response
        return newProduct;
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

        // console.log('classRef::', classRef);

        // Tạo mới
        return await new classRef(payload).createProduct();
    }
}


/**
 * @description Thêm các key-class vào factory
 * @note các key ở đây chính là product_type
*/
ProductFactoryService.addKeyClassIntoFactory({key: 'Book', classRef: Book});
ProductFactoryService.addKeyClassIntoFactory({key: 'Stationery', classRef: Stationery});


module.exports = ProductFactoryService;