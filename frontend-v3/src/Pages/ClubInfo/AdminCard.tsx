import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Ellipsis } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface User {
    user_id: string,
    display_name: string,
    avatar: string,
    noMore?: boolean
    // role: string
}

export default function AdminCard({ user_id, display_name, avatar, noMore }: User) {
    return (
        <div className="flex items-center">
            <div className="flex items-center flex-1">
                <Avatar className="mr-2">
                    <AvatarImage src={avatar} alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex-1">{display_name}</div>
            </div>

            {
                !noMore && (
                    <div className="ml-auto cursor-pointer">
                        <DropdownMenu>
                            <DropdownMenuTrigger><Ellipsis /></DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem>
                                    <div className="text-red-600" >Gỡ quyền quản trị viên</div>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                )
            }

        </div>
    )
}
