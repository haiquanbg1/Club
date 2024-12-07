function addHours(dateString) {
    // Chuyển chuỗi ngày thành đối tượng Date
    const date = new Date(dateString);

    // Kiểm tra nếu date không hợp lệ
    if (isNaN(date.getTime())) {
        throw new Error('Invalid date string');
    }

    // Cộng thêm 7 giờ vào đối tượng Date (tương ứng với múi giờ UTC+7)
    date.setHours(date.getHours() + 7);

    // Định dạng lại thành chuỗi theo định dạng 'yyyy-mm-dd hh:mm:ss'
    const result = date.toISOString().slice(0, 10).replace('T', ' ');

    return result;
}

module.exports = addHours;