import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from '@/hooks/use-toast'
import authApiRequest from "@/apiRequest/auth"
import { useRouter } from "next/navigation"



import React from 'react'

export default function Info() {
    const router = useRouter()
    const { toast } = useToast()
    const logoutHandle = async () => {
        try {
            const result = await authApiRequest.logout()
            toast({
                description: result.payload.message
                // description: "There was a problem with your request.",
            })
            console.log(result)
            router.push('/login')
        } catch (error: any) {
            console.log(error.payload)
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
            })

        }
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='noOutline' size='icon'>
                    <Avatar>
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <span className='sr-only'>Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
                <DropdownMenuItem >
                    My name
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logoutHandle}>
                    Đăng xuất
                </DropdownMenuItem>
                <DropdownMenuItem >
                    View Profile
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
