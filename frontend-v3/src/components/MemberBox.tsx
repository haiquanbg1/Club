import MemberCard from "@/components/MemberCard";
import { Input } from "./ui/input";
import { CirclePlus } from "lucide-react";
import { Button } from "./ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useState, useEffect } from "react";
import FriendApiRequest from "@/apiRequest/friend"
import { useToast } from "@/hooks/use-toast"
import MemberApiRequest from "@/apiRequest/member";

const members = [
    {
        name: "Nguyễn Văn A",
        avatar: "https://example.com/avatar1.jpg",
        id: "001"
    },
    {
        name: "Trần Thị B",
        avatar: "https://example.com/avatar2.jpg",
        id: "002"
    },
    {
        name: "Lê Văn C",
        avatar: "https://example.com/avatar3.jpg",
        id: "003"
    },
    {
        name: "Phạm Thị D",
        avatar: "https://example.com/avatar4.jpg",
        id: "004"
    },
    {
        name: "Đỗ Văn E",
        avatar: "https://example.com/avatar5.jpg",
        id: "005"
    },
    {
        name: "Hoàng Thị F",
        avatar: "https://example.com/avatar6.jpg",
        id: "006"
    }
];
interface Friend {
    user_id: string;
    friend_id: string;
    display_name: string;
    avatar: string
}

export default function MemberBox() {
    const { toast } = useToast()
    const [listFriend, setListFriend] = useState<Friend[]>([])
    const [selected, setSelected] = useState("")
    const getFriend = async () => {
        try {
            const response = await FriendApiRequest.getFriend("")
            console.log(response)
            // Giả sử API trả về mảng các object có cấu trúc tương tự Item
            setListFriend(response.payload.data);
        } catch (error) {

        }
    }
    useEffect(() => {

        getFriend();


    }, [])

    const handleSelect = (id: string) => {
        if (id == selected) {
            setSelected("")
        }
        else {
            setSelected(id)
        }
    }

    const handleAdd = async () => {
        const body = {
            user_id: selected,
            club_id: localStorage.getItem('club_id') || ""
        }

        if (selected == "") {
            toast({
                variant: "destructive",
                description: "Nobody selected",
            })
            return
        }

        if (body.club_id == "") {
            toast({
                variant: "destructive",
                description: "No club selected",
            })
            return
        }

        try {
            const res = await MemberApiRequest.add(body)
            setSelected("")
            console.log(res)
            toast({
                description: "Success",
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className=" bg-[#252525] min-w-[280px] h-screen xl:block hidden">
            <h1 className="text-center font-bold text-[26px]">Danh sách thành viên</h1>
            <div className="flex items-center mt-1 mb-2 pl-2 pr-2">
                <Input className="" placeholder="Tìm kiếm thành viên"></Input>
                <Dialog>
                    <DialogTrigger>
                        <CirclePlus size={30} className=" ml-2 cursor-pointer" />
                    </DialogTrigger>
                    <DialogContent className="bg-[#4F4F4F] p-0 overflow-hidden">
                        <DialogHeader>
                            <DialogTitle>
                                <div className="text-center bg-[#414141] pt-4 pb-4 text-[24px] mb-0">Thêm thành viên</div>
                            </DialogTitle>
                        </DialogHeader>
                        <div className="p-2 overflow-auto">
                            <h1 className="text-[24px] mb-2 text-white font-bold">Bạn bè</h1>
                            <div className="p-2 text-[16px] space-y-2">

                                {
                                    listFriend.map((friend, index) => (
                                        <div key={index} onClick={() => handleSelect(friend.friend_id)}
                                            className={`p-1 rounded-sm cursor-pointer ${selected == friend.friend_id ? 'bg-slate-300' : ''}`}
                                        >
                                            <MemberCard name={friend.display_name} noMore={true} id={friend.friend_id} avatar={friend.avatar}></MemberCard>
                                        </div>
                                    ))

                                }

                            </div>
                            <div className="flex">
                                <Button className="ml-auto" variant={"accept"} onClick={handleAdd}>Thêm thành viên</Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>

            </div>
            <div className="pl-2 pr-2 space-y-2">
                {members.map((member, index) => (
                    <MemberCard key={index} name={member.name} noMore id={member.id} avatar={member.avatar}></MemberCard>
                ))}
            </div>
            <div className="text-center absolute bottom-2 right-20">
                <Button variant={"denied"}>Rời câu lạc bộ</Button>
            </div>
        </div >
    )
}
