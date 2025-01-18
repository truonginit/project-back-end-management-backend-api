/**
 *  @description Middleware check phân quyền 
 *  @param {String} entitle có nghĩa là quyền được phép ví dụ view, update, create, delete
*/

module.exports.permission = (entitle) => (req, res, next) => {
    // có thể check authen lại
    const accountId = req.account.accountId; // lấy accountId sau khi đã check authen (nếu cóa)

    
}