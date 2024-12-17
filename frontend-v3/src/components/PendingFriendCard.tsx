import FriendApiRequest from "@/apiRequest/friend";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
export default function PendingFriendCard({ senderId, senderName, avatar, resetPendingList }: { senderId: string, senderName: string, avatar: string, resetPendingList: () => Promise<void> }) {
    const handleAccept = async () => {
        try {
            await FriendApiRequest.accept({ user_id: senderId, display_name: senderName })
            localStorage.setItem("friend", "checked")
            resetPendingList()
        } catch (error) {
        }
    }

    const handleDeny = async () => {
        try {
            await FriendApiRequest.deny({ user_id: senderId })
            resetPendingList()
        } catch (error) {
        }
    }
    return (
        <div className="border-[2px] border-[#3d3f46] rounded-lg border-[solid] p-4">
            <div className="flex items-center mb-4">
                <Avatar className="mr-3">
                    <AvatarImage src={avatar} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p>{senderName}</p>
            </div>
            <div className="flex justify-between space-x-2">
                <Button className="flex-1" variant={"accept"} onClick={handleAccept}>Xác nhận</Button>
                <Button className="flex-1" variant={"denied"} onClick={handleDeny}>Từ chối</Button>
            </div>
        </div>
    )
}