
import ChangeWindow from './ChangeWindow'

const convertDay = (day: string | undefined) => {
    if (!day) return "";
    return `${day.slice(8, 10)}/${day.slice(5, 7)}/${day.slice(0, 4)}`
}
interface info {
    id: string;
    display_name: string;
    email: string;
    avatar: string;
    birthday: string;
    gender: number;
    resetInfo?: () => Promise<void>
    check: boolean
}
export default function ProfileCard({ id, resetInfo, display_name, email, avatar, birthday, gender, check }: info) {

    // const navigate = useNavigate()

    return (
        <>
            <div className='rounded-md w-full overflow-hidden bg-[#3f3f3f]'>
                <div className='min-h-[100px] bg-[#ECDFCC] flex'>
                </div>
                <div className='flex justify-between h-[60px]'>
                    <div className='flex'>
                        <div className=' translate-y-[-40px] translate-x-5 rounded-full bottom-[-40px] left-[20px] border-[8px] border-[#3f3f3f] bg-red-50 w-[100px] h-[100px]'>
                            <img className='w-full h-full object-cover rounded-full' src={avatar}></img>
                        </div>
                        <div className='translate-x-5 translate-y-[10px]'>
                            <p>{display_name}</p>
                            {/* <p>{info?.data.id}</p> */}
                        </div>
                    </div>
                    <div className='mt-[5px] pr-[10px]'>
                        {
                            check &&
                            <ChangeWindow resetInfo={resetInfo} display_name={display_name || ""} birthDay={convertDay(birthday)} />

                        }
                    </div>
                </div>
                <div className='p-[10px]'>
                    <div className=' dark:bg-[#121212] min-h-[40px] rounded-[10px] p-[10px]'>
                        <div className='flex justify-between mb-[20px]'>
                            <div>
                                <div className='text-[16px] text-[#ccc]'>Tên hiển thị</div>
                                <div className='text-[14px]'>{display_name}</div>
                            </div>
                            <div>

                            </div>
                        </div>

                        <div className='flex justify-between mb-[20px]'>
                            <div>
                                <div className='text-[16px] text-[#ccc]'>Id người dùng</div>
                                <div className='text-[14px]'>{id}</div>
                            </div>
                            <div>

                            </div>
                        </div>

                        <div className='flex justify-between mb-[20px]'>
                            <div>
                                <div className='text-[16px] text-[#ccc]'>Tên đăng nhập</div>
                                <div className='text-[14px]'>{email}</div>
                            </div>
                            <div>

                            </div>
                        </div>

                        <div className='flex justify-between mb-[20px]'>
                            <div>
                                <div className='text-[16px] text-[#ccc]'>Ngày sinh</div>
                                <div className='text-[14px]'>{convertDay(birthday)}</div>
                            </div>
                            <div>

                            </div>
                        </div>

                        <div className='flex justify-between '>
                            <div>
                                <div className='text-[16px] text-[#ccc]'>Giới tính</div>
                                <div className='text-[14px]'>{gender == 1 ? "Nam" : "Nữ"}</div>
                            </div>
                            <div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
