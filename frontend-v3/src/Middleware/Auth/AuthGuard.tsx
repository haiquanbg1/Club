import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';
// import Cookies from 'js-cookie';
import Cookies from 'js-cookie'
interface AuthGuardProps {
    children: React.ReactNode;
    isAuthenticated: boolean;
    redirectTo: string;
}

// Thành phần bảo vệ cho route
const AuthGuard: React.FC<AuthGuardProps> = ({ children, isAuthenticated, redirectTo }) => {
    const [isAuthChecked, setIsAuthChecked] = useState(false); // Thêm state để kiểm tra khi nào xác thực xong
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = () => {
            const accessToken = Cookies.get('isLogin');
            return Boolean(accessToken); // Trả về true/false nếu cookie tồn tại
        };

        setIsAuthChecked(true); // Đánh dấu đã kiểm tra

        if (!checkAuth() && !isAuthenticated) {
            // Sử dụng navigate để điều hướng
            navigate(redirectTo);
        }
    }, [isAuthenticated, navigate]); // Thêm navigate vào dependency array

    if (!isAuthChecked) {
        // Trả về loading hoặc chờ đợi xác thực
        return <div>Loading...</div>;
    }

    return <>{children}</>;
};

export default AuthGuard;
