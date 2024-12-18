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
import ChatApiRequest from "@/apiRequest/chat"
interface Member {
    name: string,
    avatar?: string,
    id?: string,
    noMore?: boolean,
    pending?: boolean,
    event?: boolean,
    admin?: boolean,
    chatPage?: boolean
    resetMember?: () => Promise<void>
    resetMember2?: () => Promise<void>
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}
import { useToast } from "@/hooks/use-toast"
export default function MemberCard({ name = "Lê Trọng Khánh", chatPage, admin, avatar, id, event, noMore = false, resetMember, pending, setOpen, resetMember2 }: Member) {
    const { toast } = useToast()
    const { clubId, eventId, conversationId } = useParams()
    const handleDelete = async () => {
        const body = {
            "user_id": id || "",
            "club_id": clubId || ""
        }
        try {
            await MemberApiRequest.delete(body)
            if (resetMember) {
                resetMember()
            }
            toast({
                title: "Thành công",
                description: "Đã xóa thành viên",
            })
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
            })
        }
    }
    const handleDeleteChatMember = async () => {
        const body = {
            "user_id": id || "",
            "club_id": clubId || "",
            "conversation_id": conversationId || ""
        }
        try {
            await ChatApiRequest.deleteParticipant(body)
            toast({
                title: "Thành công",
                description: "Đã xóa thành viên",
            })
            if (resetMember) {
                resetMember()
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
            })
        }
    }

    const handleAccept = async () => {
        const body = {
            "event_id": eventId || "",
            "club_id": clubId || "",
            "user_id": id || "",
        }
        try {
            await ClubApiRequest.acceptRequest(body)
            if (resetMember) {
                resetMember()
            }
            if (resetMember2) {
                resetMember2()
            }
            toast({
                title: "Thành công"
            })

        } catch (error) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
            })
        }
    }

    const handleDeny = async () => {
        const body = {
            "event_id": eventId || "",
            "club_id": clubId || "",
            "user_id": id || "",
        }
        try {
            await ClubApiRequest.denyRequest(body)
            if (resetMember) {
                resetMember()
            }
            if (resetMember2) {
                resetMember2()
            }

        } catch (error) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
            })
        }
    }

    const handleDeleteEvent = async () => {
        const body = {
            "event_id": eventId || "",
            "club_id": clubId || "",
            "user_id": id || "",
        }
        try {
            await ClubApiRequest.kickParticipant(body)
            if (resetMember) {
                resetMember()
            }
            if (setOpen) {
                setOpen(false)
            }
            toast({
                title: "Thành công",
                description: "Đã xóa thành viên",
            })
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
            })
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
            {(!noMore && admin && id != localStorage.getItem("user_id")) &&
                (<div className="ml-auto cursor-pointer">
                    <DropdownMenu>
                        <DropdownMenuTrigger><Ellipsis /></DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>
                                {
                                    !chatPage &&
                                    <div className="text-red-600" onClick={handleDelete}>Xóa khỏi câu lạc bộ</div>
                                }
                                {
                                    chatPage &&
                                    <div className="text-red-600" onClick={handleDeleteChatMember}>Xóa khỏi đoạn chat</div>
                                }
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
