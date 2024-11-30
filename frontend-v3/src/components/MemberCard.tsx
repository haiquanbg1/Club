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
import MemberApiRequest from "@/apiRequest/member"
import { Button } from "./ui/button"
import ClubApiRequest from "@/apiRequest/club"
interface Member {
    name: string,
    avatar?: string,
    id?: string,
    noMore?: boolean,
    pending?: boolean,
    resetMember?: () => Promise<void>
}

export default function MemberCard({ name = "Lê Trọng Khánh", avatar, id, noMore = false, resetMember, pending }: Member) {
    const handleDelete = async () => {
        const body = {
            "user_id": id || "",
            "club_id": localStorage.getItem("club_id") || ""
        }
        try {
            const res = await MemberApiRequest.delete(body)
            console.log(res)
            if (resetMember) {
                resetMember()
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className={pending ? "space-y-2" : "flex items-center"}>
            <div className="flex items-center">
                <Avatar className="mr-2">
                    <AvatarImage src={avatar} alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>{name}</div>
            </div>
            {!noMore &&
                (<div className="ml-auto cursor-pointer">
                    <DropdownMenu>
                        <DropdownMenuTrigger><Ellipsis /></DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>
                                <div className="text-red-600" onClick={handleDelete}>Xóa khỏi câu lạc bộ</div>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>)
            }
            {
                pending && (
                    <div className="flex space-x-2">
                        <Button>Chấp nhận</Button>
                        <Button>Từ chối</Button>
                    </div>
                )
            }
        </div>
    )
}
