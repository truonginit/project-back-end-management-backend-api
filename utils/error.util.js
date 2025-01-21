

/**
 * @description Tách error.stack ra thành từng thành phần
 * @param {*} stack 
 */
module.exports.splitStackMessage = (stack) => {
    let arr = stack.split('\n');
    arr = arr.map(item => item.trim())  // loại bỏ khoảng trống giữa các phần tử
    const temps  = arr[1].split('(');
    
    // lấy message, tên của module gặp lỗi và file lỗi đó
    const message = arr[0];             // lấy message của error
    const module = temps[0];
    const file   = temps[1]?.slice(temps[1].lastIndexOf('\\'), temps[1].length-1);

    // const indexOfFile = file.lastIndexOf('js');
    // const line = file.slice(indexOfFile);

    // console.log(`messsage::${message}`);
    // console.log(`module::${module}`);
    // console.log(`file::${file}`);
    // console.log(`line::${line}`);
    
    return { message, module, file };
}