'use client'
import userApiRequest from '@/apiRequest/userProfile'
import React, { useEffect, useState } from 'react'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from "next/navigation"
import { UserProfileResType } from '@/schemaValidations/profile.schema'
import { Button } from '@/components/ui/button'

export default function ProfileCard() {
    const router = useRouter()
    const { toast } = useToast()
    const [info, setInfo] = useState<UserProfileResType>()
    const getInfo = async () => {
        try {
            const result = await userApiRequest.getProfile()
            setInfo(result.payload)
            console.log(result.payload)
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
        <div className='rounded-md w-full overflow-hidden bg-[#3f3f3f]'>
            <div className='min-h-[100px] bg-[#ECDFCC] flex'>
            </div>
            <div className='flex justify-between h-[60px]'>
                <div className='flex'>
                    <div className='p-[40px] translate-y-[-40px] translate-x-5 rounded-full bottom-[-40px] left-[20px] border-[6px] border-[#3f3f3f] bg-red-50 w-[80px] h-[80px]'></div>
                    <div className='translate-x-5 translate-y-[10px]'>My name</div>
                </div>
                <div className='mt-[5px] pr-[10px]'>
                    <Button variant={"blue"} className="text-[14px] p-[5px] bg-[#4F75FF]">Chỉnh sửa hồ sơ người dùng</Button>
                </div>
            </div>
            <div className='p-[10px]'>
                <div className=' dark:bg-[#121212] min-h-[40px] rounded-[10px] p-[10px]'>
                    <div className='flex justify-between mb-[20px]'>
                        <div>
                            <div className='text-[16px] text-[#ccc]'>Tên hiển thị</div>
                            <div className='text-[14px]'>Khánh</div>
                        </div>
                        <div>
                            <Button variant={"reset"} className='pt-[2px] pb-[2px] text-[14px] bg-[#282828]'>Chỉnh sửa</Button>
                        </div>
                    </div>

                    <div className='flex justify-between mb-[20px]'>
                        <div>
                            <div className='text-[16px] text-[#ccc]'>Tên đăng nhập</div>
                            <div className='text-[14px]'>letrongkhanh26112004@gmail.com</div>
                        </div>
                        <div>
                            <Button variant={"reset"} className='pt-[2px] pb-[2px] text-[14px] bg-[#282828]'>Chỉnh sửa</Button>
                        </div>
                    </div>

                    <div className='flex justify-between mb-[20px]'>
                        <div>
                            <div className='text-[16px] text-[#ccc]'>Ngày sinh</div>
                            <div className='text-[14px]'>26/11/2004</div>
                        </div>
                        <div>
                            <Button variant={"reset"} className='pt-[2px] pb-[2px] text-[14px] bg-[#282828]'>Chỉnh sửa</Button>
                        </div>
                    </div>

                    <div className='flex justify-between '>
                        <div>
                            <div className='text-[16px] text-[#ccc]'>Giới tính</div>
                            <div className='text-[14px]'>Nam</div>
                        </div>
                        <div>
                            <Button variant={"reset"} className='pt-[2px] pb-[2px] text-[14px] bg-[#282828]'>Chỉnh sửa</Button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
