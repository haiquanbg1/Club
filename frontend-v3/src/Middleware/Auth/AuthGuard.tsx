import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

interface AuthGuardProps {
    children: React.ReactNode;
    isAuthenticated: boolean;
    redirectTo: string;
}

// Thành phần bảo vệ cho route
const AuthGuard: React.FC<AuthGuardProps> = ({ children, isAuthenticated, redirectTo }) => {
    const accessToken = Cookies.get('accessToken');
    console.log(accessToken)
    if (!isAuthenticated) {
        return <Navigate to={redirectTo} />;
    }
    return <>{children}</>;
};

export default AuthGuard;
