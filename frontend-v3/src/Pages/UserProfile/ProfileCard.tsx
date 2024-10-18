
import userApiRequest from '@/apiRequest/userProfile'
import { useEffect, useState } from 'react'
import { useToast } from '@/hooks/use-toast'
// import { useNavigate } from 'react-router-dom'
import { UserProfileResType } from '@/schemaValidations/profile.schema'
import ChangeWindow from './ChangeWindow'

const convertDay = (day: string | undefined) => {
    if (!day) return "";
    return `${day.slice(8, 10)}/${day.slice(5, 7)}/${day.slice(0, 4)}`
}

export default function ProfileCard() {

    // const navigate = useNavigate()
    const { toast } = useToast()
    const [info, setInfo] = useState<UserProfileResType>()
    const getInfo = async () => {
        try {
            const result = await userApiRequest.getProfile()
            setInfo(result?.payload)
            console.log(result?.payload)
        } catch (error: any) {
            console.log(error.payload)
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
            })

        }
    }
    useEffect(() => {
        getInfo()
    }
        , [])
    return (
        <>
            <div className='rounded-md w-full overflow-hidden bg-[#3f3f3f]'>
                <div className='min-h-[100px] bg-[#ECDFCC] flex'>
                </div>
                <div className='flex justify-between h-[60px]'>
                    <div className='flex'>
                        <div className=' translate-y-[-40px] translate-x-5 rounded-full bottom-[-40px] left-[20px] border-[8px] border-[#3f3f3f] bg-red-50 w-[100px] h-[100px]'>
                            <img className='w-full h-full object-cover rounded-full' src={info?.data.avatar}></img>
                        </div>
                        <div className='translate-x-5 translate-y-[10px]'>{info?.data.display_name}</div>
                    </div>
                    <div className='mt-[5px] pr-[10px]'>
                        <ChangeWindow display_name={info?.data.display_name || ""} birthDay={convertDay(info?.data.birthday)} />
                    </div>
                </div>
                <div className='p-[10px]'>
                    <div className=' dark:bg-[#121212] min-h-[40px] rounded-[10px] p-[10px]'>
                        <div className='flex justify-between mb-[20px]'>
                            <div>
                                <div className='text-[16px] text-[#ccc]'>Tên hiển thị</div>
                                <div className='text-[14px]'>{info?.data.display_name}</div>
                            </div>
                            <div>

                            </div>
                        </div>

                        <div className='flex justify-between mb-[20px]'>
                            <div>
                                <div className='text-[16px] text-[#ccc]'>Tên đăng nhập</div>
                                <div className='text-[14px]'>{info?.data.email}</div>
                            </div>
                            <div>

                            </div>
                        </div>

                        <div className='flex justify-between mb-[20px]'>
                            <div>
                                <div className='text-[16px] text-[#ccc]'>Ngày sinh</div>
                                <div className='text-[14px]'>{convertDay(info?.data.birthday)}</div>
                            </div>
                            <div>

                            </div>
                        </div>

                        <div className='flex justify-between '>
                            <div>
                                <div className='text-[16px] text-[#ccc]'>Giới tính</div>
                                <div className='text-[14px]'>{info?.data.gender ? "Nam" : "Nữ"}</div>
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
