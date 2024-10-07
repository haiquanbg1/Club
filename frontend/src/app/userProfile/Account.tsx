import React from 'react'
import { Button } from '@/components/ui/button'
export default function Account() {
    return (
        <div className='w-full'>
            <h3 className='mb-[10px]'>Ngưng sử dụng tài khoản</h3>
            <div>
                <Button variant={"destructive"} className="text-[14px] p-[5px] ">Xóa tài khoản </Button>
            </div>
        </div>
    )
}
