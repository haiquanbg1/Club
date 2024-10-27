import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import AddFriendForm from "./AddFriendForm"
import PendingFriendCard from "@/components/PendingFriendCard"
import { useEffect, useState } from "react"
import FriendApiRequest from "@/apiRequest/friend"

const testName = ["Khánh", "Quân", "Doanh", "Hiếu", "Thắng"]

interface PendingUser {
    user_id: string;
    friend_id: string;
    display_name: string;
}
export default function Home() {
    const [pending, setPending] = useState<PendingUser[]>([])
    // const [listFriend, setListFriend] = useState<>([])

    const getPending = async () => {
        try {
            const response = await FriendApiRequest.pending()
            console.log(response)
            // Giả sử API trả về mảng các object có cấu trúc tương tự Item
            setPending(response.payload.data);
        } catch (error) {

        }
    }

    useEffect(() => {
        getPending()
    }, [])
    return (
        <div className="w-full h-screen max-h-screen overflow-auto">
            {/* <div>Home page</div> */}
            <div className="flex flex-1 h-full">
                <div className="w-[300px] bg-gray-700 overflow-auto">
                    <h3 className="text-center text-[20px] mb-3">Bạn bè</h3>
                    {testName.map((namee, index) => (
                        <div className="flex items-center mb-4 cursor-pointer hover:bg-slate-400" key={index}>
                            <Avatar className="mr-4">
                                <AvatarImage src="https://github.com/shadcn.png" />
                            </Avatar>
                            <p className="text-[16px]">{namee}</p>
                        </div>
                    ))}
                </div>
                <div className="bg-[#A0A0A0] w-full p-4">
                    <AddFriendForm />
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 p-4">
                        {pending.map((user, index) => (
                            <div key={index}>
                                <PendingFriendCard senderId={user.user_id} senderName={user.display_name} resetPendingList={getPending} />
                            </div>
                        ))}

                    </div>


                </div>

            </div>

        </div>

    )
}
