'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import userApiRequest from '@/apiRequest/userProfile'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
export default function Account() {
    const router = useRouter()
    const { toast } = useToast()
    const handleDelete = async () => {
        try {
            const res = await userApiRequest.delete();
            console.log(res)
            router.push("/login")
        }
        catch (error: any) {
            console.log(error.payload)
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
            })

        }
    }
    return (
        <div className='w-full'>
            <h3 className='mb-[10px]'>Ngưng sử dụng tài khoản</h3>
            <div>
                <Button variant={"destructive"} className="text-[14px] p-[5px] " onClick={handleDelete}>Xóa tài khoản </Button>
            </div>
        </div>
    )
}
