import Cookies from 'js-cookie';

// Kiểm tra người dùng có accessToken hay không
export const isAuthenticated = (): boolean => {
    const accessToken = Cookies.get('isLogin');
    return !!accessToken;
};
