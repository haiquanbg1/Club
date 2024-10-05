const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Đường dẫn tuyệt đối tới thư mục lưu trữ bên ngoài
const uploadDirectory = path.join(__dirname, '../public/images');

// Kiểm tra và tạo thư mục nếu chưa tồn tại
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory, { recursive: true });
}

// Cấu hình multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDirectory);
    },
    filename: function (req, file, cb) {
        const username = req.user.username;
        const fileExtension = path.extname(file.originalname);
        const customFileName = `${username}${fileExtension}`; // Tên file theo người dùng
        const filePath = path.join('uploads', customFileName);

        // Kiểm tra file đã tồn tại chưa
        if (fs.existsSync(filePath)) {
            // Nếu file tồn tại, xóa nó
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error('Lỗi khi xóa file:', err);
                    return cb(err);
                }
                console.log(`Đã xóa file cũ: ${customFileName}`);
                cb(null, customFileName);
            });
        } else {
            cb(null, customFileName);
        }
    }
});

exports.upload = multer({ storage: storage });
