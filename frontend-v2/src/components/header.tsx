import React from 'react'
import { ModeToggle } from './mode-toggle'
import Info from './info'
import { Link, useLocation } from 'react-router-dom';



export default function Header() {
    const location = useLocation();
    const pathName = location.pathname;
    const isAuth = pathName === "/login" || pathName === "/register"
    return (
        <div >
            {!isAuth &&
                <ul className='space-y-4 items-center justify-end pt-[4px] '>
                    <li>
                        <Info></Info>
                    </li>
                    <li>
                        <ModeToggle />
                    </li>
                </ul>
            }
            {
                isAuth &&
                <ul className='flex space-x-4 items-center justify-end pt-[4px] pr-[20px]'>
                    <li>
                        <Link to='/login'>Đăng nhập</Link>
                    </li>
                    <li>
                        <Link to='/register'>Đăng ký</Link>
                    </li>
                </ul>
            }

        </div>
    )
}
