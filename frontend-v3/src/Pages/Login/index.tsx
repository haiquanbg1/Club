// import React from 'react'
import LoginForm from "./LoginForm"
import { isAuthenticated } from "@/Middleware/Auth/authUtils"
import { Navigate } from 'react-router-dom';
export default function LoginPage() {
    if (isAuthenticated()) {
        return <Navigate to="/" />;
    }
    return (
        <div className='space-y-5 w-full md:w-[50%] xl:w-[40%] 2xl:w-[30%] m-auto'>
            <h1 className='text-center font-bold text-[30px]'>Đăng nhập</h1>
            <div className='flex justify-center'>
                <LoginForm />
            </div>
        </div>
    )
}
