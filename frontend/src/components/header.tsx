import Link from 'next/link'
import React from 'react'
import { ModeToggle } from './mode-toggle'
import Info from './info'



export default function Header({ isAuth }: { isAuth: boolean }) {
    return (
        <div >
            {!isAuth &&
                <ul className='flex space-x-4 items-center justify-end pt-[4px] pr-[20px]'>
                    <li>
                        <Link href='/login'>Đăng nhập</Link>
                    </li>
                    <li>
                        <Link href='/register'>Đăng ký</Link>
                    </li>
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
                        <Link href='/login'>Đăng nhập</Link>
                    </li>
                    <li>
                        <Link href='/register'>Đăng ký</Link>
                    </li>
                </ul>
            }

        </div>
    )
}
