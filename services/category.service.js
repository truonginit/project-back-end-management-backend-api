// model 
const CategoryModel = require('../models/category.model');

// repo
const { 
    findCategoryById,
    findAllCategory,
    deleteSoftById,
    updateStatusById
} = require('../models/repositories/category.repo');

// core response
const { BadRequestError, NotFoundError } = require('../core/error.response');

// helper
const createTreeCategory = require('../helpers/createTreeCategory.helper');

// utils
const { 
    selectFieldInMongoose, 
    removeFieldNullOrUndefined, 
    parseObjectIdMongoose,
    pickFieldInObject
} = require('../utils/index.util');
const { child } = require('winston');

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

    /**
     * @description Lấy cây danh mục 
     * @returns 
    */
    static getTreeCategory = async () => {
        const categories = await findAllCategory({ status: 'active', isDeleted: false, isLean: false});
        const result = createTreeCategory(categories, "");
        console.log(`result::`, result); // mở log trên browser mới xem được
        return result;
    }

    /**
     * @description Xóa mềm 1 danh mục 
     * @param {String} categoryId 
     * @returns 
    */
    static deleteSoft = async ({ categoryId }) => {
        const foundCategory = await deleteSoftById({ categoryId });
        if(!foundCategory) throw new NotFoundError(`Category not exists`);
        return foundCategory;
    }

    static updateStatusOfOneCategory = async ({ categoryId, status }) => {
        // kiểm tra trạng thái có hợp lệ không
        const StateOfStatus = ['active', 'inactive', 'pending'];
        if(!StateOfStatus.includes(status)) throw new BadRequestError(`State of Status isn't valid`);

        const foundCategory = await updateStatusById({ categoryId, status });
        if(!foundCategory) throw new NotFoundError('Category not exist');
        return foundCategory;
    }
}

// exports
module.exports = CategoryService;