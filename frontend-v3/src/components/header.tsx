import { Link } from 'react-router-dom'

export default function Header() {
    return (
        <div>

            <ul className='flex space-x-4 items-center justify-end pt-[4px] pr-[20px]'>
                <li>
                    <Link to='/login'>Đăng nhập</Link>
                </li>
                <li>
                    <Link to='/register'>Đăng ký</Link>
                </li>
            </ul>


        </div>
    )
}
