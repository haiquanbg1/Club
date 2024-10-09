require("dotenv").config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
    secure: true,
});

// Hàm upload ảnh
const uploadImage = async (filePath) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder: 'Avatar',  // Tên thư mục lưu ảnh trên Cloudinary
            use_filename: true,          // Dùng tên file gốc làm tên file trên Cloudinary
            unique_filename: false,      // Không tạo tên file ngẫu nhiên
            overwrite: true              // Ghi đè nếu tên file trùng
        });
        return result;
    } catch (error) {
        console.error('Lỗi khi upload:', error);
    }
};

const getImage = async (folderName, fileName) => {
    try {
        const result = await cloudinary.url(`${folderName}/${fileName}`, { secure: true });
        return result;  // URL an toàn của ảnh
    } catch (error) {
        console.error('Lỗi khi lấy ảnh:', error);
    }
}

const deleteImage = async (folderName, publicId) => {
    const fullPublicId = `${folderName}/${publicId}`; // Đường dẫn đầy đủ bao gồm thư mục
    try {
        const result = await cloudinary.uploader.destroy(fullPublicId);
        return result;
    } catch (error) {
        console.error('Lỗi khi xóa ảnh:', error);
    }
};

module.exports = {
    uploadImage,
    getImage,
    deleteImage
};