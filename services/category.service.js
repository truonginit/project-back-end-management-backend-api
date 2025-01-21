// model 
const CategoryModel = require('../models/category.model');

// repo
const { 
    findCategoryById,
    findAllCategory
} = require('../models/repositories/category.repo');

// core response
const { BadRequestError, NotFoundError } = require('../core/error.response');

// utils
const { 
    selectFieldInMongoose, 
    removeFieldNullOrUndefined, 
    parseObjectIdMongoose,
    pickFieldInObject
} = require('../utils/index.util');

// service
class CategoryService {
    /**
     * @description Tạo mới một danh mục
     * @param {*} param0 
     * @returns 
     */
    static createNewCategory = async ({  parent_categoryId, name, description, thumb, accountId }) => {
        // check xem category cha có hợp lệ không
        let foundParentCategory;
        if(parent_categoryId !== "" && parent_categoryId !== undefined) {
            foundParentCategory = await findCategoryById({ categoryId: parent_categoryId });
            if(!foundParentCategory) throw new NotFoundError('Không tìm thấy danh mục cha');
        }

        const fieldNewCategory = {
            category_parent_categoryId: parent_categoryId,
            category_name: name,
            category_description: description,
            category_thumb: thumb,
            category_accountId: parseObjectIdMongoose(accountId)
        }
        const newCategory = await CategoryModel.create(removeFieldNullOrUndefined(fieldNewCategory));

        if(!newCategory) throw new BadRequestError('Tạo danh mục thất bại');

        // field select
        const fieldSelect = [
            'parent_categoryId',
            'category_name',
            'category_description',
            'category_accountId'
        ];

        return pickFieldInObject({ object: newCategory, field: fieldSelect });
    }

    /**
     * @description Lấy danh sách danh mục
     * @param {String} status 
     * @param {Boolean} isDeleted 
     * @returns 
     */
    static findAllCategory = async ({ status, isDeleted }) => {
        return await findAllCategory({ status, isDeleted })
    }


    static findDetailCategoryById = async ({ categoryId, status, isDeleted }) => {
        return await findCategoryById({categoryId , status, isDeleted });
    }
}

// exports
module.exports = CategoryService;