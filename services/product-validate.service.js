// schema validation
const { AddBookAttributeJoi, UpdateBookAttributeJoi } = require('../validations/admin/book.validation');
const { AddStationeryAttribute, UpdateStationeryAttribute } = require('../validations/admin/stationery.validation');

class ProductValidateFactory {
    static factory = {}; // factory product
    
    /**
     * @description Thêm factory theo type và typeRef
    */
    static addFactoryByType = (type, typeRef, schemaRef) => {
        const key = `${type}-${typeRef}`;
        ProductValidateFactory.factory[key] = schemaRef; 
    }

    /**
     * @description Lấy factory theo type và typeRef
     * @param {*} type để lựa chọn muốn lấy schema create hay là update
     * @param {*} typeRef 
     * @param {*} schemaRef 
     * @returns 
     */
    static getFactoryByType = (type, typeRef) => {
        const key = `${type}-${typeRef}`;
        return ProductValidateFactory.factory[key];
    }
}

ProductValidateFactory.addFactoryByType('create', 'Book',       AddBookAttributeJoi);
ProductValidateFactory.addFactoryByType('create', 'Stationery', AddStationeryAttribute);

ProductValidateFactory.addFactoryByType('update', 'Book',       UpdateBookAttributeJoi);
ProductValidateFactory.addFactoryByType('update', 'Stationery', UpdateStationeryAttribute);

module.exports = ProductValidateFactory