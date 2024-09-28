import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"



import React from 'react'

export default function Info() {
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
                <DropdownMenuItem >
                    Đăng xuất
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
