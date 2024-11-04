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
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


interface Member {
    name: string,
    avatar: string,
    id: string,
    noMore: boolean
}

export default function MemberCard({ name = "Lê Trọng Khánh", avatar, id, noMore = false }: Member) {
    return (
        <div className="flex items-center">
            <Avatar className="mr-2">
                <AvatarImage src={avatar} alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>{name}</div>
            {!noMore &&
                (<div className="ml-auto cursor-pointer">
                    <DropdownMenu>
                        <DropdownMenuTrigger><Ellipsis /></DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>
                                <div className="text-red-600">Xóa khỏi câu lạc bộ</div>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>)
            }
        </div>
    )
}
