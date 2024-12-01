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
import { useParams } from "react-router-dom"
interface Member {
    name: string,
    avatar?: string,
    id?: string,
    noMore?: boolean,
    pending?: boolean,
    event?: boolean,
    resetMember?: () => Promise<void>
    resetMember2?: () => Promise<void>
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MemberCard({ name = "Lê Trọng Khánh", avatar, id, event, noMore = false, resetMember, pending, setOpen, resetMember2 }: Member) {
    const { clubId, eventId } = useParams()
    const handleDelete = async () => {
        const body = {
            "user_id": id || "",
            "club_id": clubId || ""
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

    const handleAccept = async () => {
        const body = {
            "event_id": eventId || "",
            "club_id": clubId || "",
            "user_id": id || "",
        }
        try {
            const res = await ClubApiRequest.acceptRequest(body)
            if (resetMember) {
                resetMember()
            }
            if (resetMember2) {
                resetMember2()
            }
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

    const handleDeny = async () => {
        const body = {
            "event_id": eventId || "",
            "club_id": clubId || "",
            "user_id": id || "",
        }
        try {
            const res = await ClubApiRequest.denyRequest(body)
            if (resetMember) {
                resetMember()
            }
            if (resetMember2) {
                resetMember2()
            }
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

    const handleDeleteEvent = async () => {
        const body = {
            "event_id": eventId || "",
            "club_id": clubId || "",
            "user_id": id || "",
        }
        try {
            const res = await ClubApiRequest.kickParticipant(body)
            if (resetMember) {
                resetMember()
            }
            if (setOpen) {
                setOpen(false)
            }
            console.log(res)
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
            {event &&
                (<div className="ml-auto cursor-pointer">
                    <DropdownMenu>
                        <DropdownMenuTrigger><Ellipsis /></DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>
                                <div className="text-red-600" onClick={handleDeleteEvent}>Xóa khỏi sự kiện</div>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>)
            }
            {
                pending && (
                    <div className="flex space-x-2">
                        <Button onClick={handleAccept}>Chấp nhận</Button>
                        <Button onClick={handleDeny}>Từ chối</Button>
                    </div>
                )
            }
        </div>
    )
}
