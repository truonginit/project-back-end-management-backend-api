/**
 * @description Discount Service các thao tác với các mã giảm giá
*/

// model 
const DiscountModel = require('../models/discount.model');

// repo
const {
    findDiscountCode,
    createNewDiscount,
    findByDiscountById
} = require('../models/repositories/discount.repo');

// core response
const { BadRequestError, NotFoundError } = require('../core/error.response');

// service
class DiscountService {

    /**
     * @description Tạo mới mã giảm giá 
     * @param {*} param0 
     * @returns 
    */
    static createNewDiscount = async ({
        code,
        name,
        description,
        type,
        value,
        using_per_user,
        max_use,
        min_order,
        start_date,
        end_date,
        accountId
    }) => {

        // check xem discount code này đã tồn tại chưa
        const foundDiscount = await findDiscountCode({ code });
        if(foundDiscount) throw new BadRequestError('Discount Code is exists'); 


        // check discount_value có hợp lý với discount_type không
        // ví dụ discount_type = "percentage" thì discount_value >= 0 && discount_value <= 100 
        if(value < 0) 
            throw new BadRequestError('discount value is not reasonable'); // không có giảm giá dưới 0

        if(type === "percentage" &&  value > 100 ) {
            // giảm giá theo % không có > 100
            throw new BadRequestError('discount value is not reasonable');
        }


        // check thời gian bắt đầu discount code có hợp lý không
        const rightNow = new Date();
        
        // console.log(`rightNow::${rightNow}`);
        // console.log(`startDate::${new Date(start_date)}`);
        // console.log(`endDate::${new Date(end_date)}`);
    
        if(rightNow > new Date(start_date)) 
            throw new BadRequestError(`Time start discount isn't valid [1]`);

        // check thời gian bắt đầu và thời gian kết thúc của discount code
        if(new Date(end_date) < new Date(start_date))
            throw new BadRequestError(`Time start discount isn't valid [2]`);

        // tạo mới
        return await createNewDiscount({
            code,
            name,
            description,
            type,
            value,
            using_per_user,
            max_use,
            min_order,
            start_date,
            end_date,
            accountId
        });
    }

    /**
     * @description Cập nhật trạng thái của discount
    */
    static updateStatus = async ({ discountId, status }) => {
        // check xem discount code này đã tồn tại chưa
        const foundDiscount = await findByDiscountById({ discountId, isDeleted: false, isLean: false });
        if(!foundDiscount) throw new BadRequestError('Discount Code is not exists'); 

        // check status muốn update có hợp lý không
        const StateOfStatus = ['active', 'inactive', 'pending'];
        if(StateOfStatus.includes(status) === false) throw new BadRequestError('Status want to update is not valid');

        foundDiscount.discount_status = status;
        await foundDiscount.save();
        return foundDiscount;
    }
}

// export
module.exports = DiscountService;