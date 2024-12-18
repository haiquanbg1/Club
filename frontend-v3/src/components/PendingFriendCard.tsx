import FriendApiRequest from "@/apiRequest/friend";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useDispatch } from "react-redux";
import { setFriend } from "@/redux/friendSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function PendingFriendCard({ senderId, senderName, avatar, resetPendingList }: { senderId: string, senderName: string, avatar: string, resetPendingList: () => Promise<void> }) {
    const dispatch = useDispatch();
    const friend = useSelector((state: RootState) => state.friend.friend);
    const updateFriend = () => {
        if (friend == "") {
            dispatch(setFriend("newFriendValue"));
        }
        else {
            dispatch(setFriend(""));
        }
        // Cập nhật Redux state
    };
    const handleAccept = async () => {
        try {
            await FriendApiRequest.accept({ user_id: senderId, display_name: senderName })
            updateFriend()
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