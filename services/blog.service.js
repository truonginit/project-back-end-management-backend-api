// model 
const BlogModel = require('../models/blog.model');

// repo
const { findCategoryById } = require('../models/repositories/category.repo');

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
class BlogService {
    /**
     * @description Tạo mới một bài viết
     * @param {*} param0 
     * @returns 
    */
    static createNewBlog = async ({ name, content }) => {
        
    }
}

// exports
module.exports = BlogService;