import { Button } from '@/components/ui/button'
import React from 'react'

export default function Password() {
    return (
        <div className='w-full'>
            <h3 className='text-[20px] mb-[10px]'>Mật khẩu và xác thực</h3>
            <div>
                <Button variant={"blue"} className="text-[14px] p-[5px] bg-[#4F75FF]">Đổi mật khẩu </Button>
            </div>
        </div>
    )
}
