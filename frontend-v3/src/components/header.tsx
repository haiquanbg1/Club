import { Link } from 'react-router-dom'
import { ModeToggle } from './mode-toggle'
import Info from './info'
import { useLocation } from 'react-router-dom'



export default function Header() {
    const location = useLocation();
    const pathName = location.pathname;
    const isAuth = pathName === "/login" || pathName === "/register"
    return (
        <div className='' >
            {!isAuth &&
                <ul className='space-y-4 items-center bg-transparent  pt-[4px] '>
                    {/* <li>
                        <Link href='/login'>Đăng nhập</Link>
                    </li>
                    <li>
                        <Link href='/register'>Đăng ký</Link>
                    </li> */}
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
            {/* <div>

            <ul className='flex space-x-4 items-center justify-end pt-[4px] pr-[20px]'>
                <li>
                    <Link to='/login'>Đăng nhập</Link>
                </li>
                <li>
                    <Link to='/register'>Đăng ký</Link>
                </li>
            </ul> */}


        </div>
    )
}