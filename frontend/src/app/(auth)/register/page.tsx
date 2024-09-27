import React from 'react'
import { RegisterForm } from './RegisterForm'
export default function RegisterPage() {
    return (
        <div className='space-y-5 w-full md:w-[50%] xl:w-[40%] 2xl:w-[30%] m-auto'>
            <h1 className='text-center font-bold text-[30px]'>Đăng ký</h1>
            <div className='flex justify-center '>
                <RegisterForm />
            </div>
        </div>
    )
}
