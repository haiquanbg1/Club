import { useState, useEffect } from "react";
import FriendApiRequest from "@/apiRequest/friend"
import { useToast } from "@/hooks/use-toast"
import MemberCard from "@/components/MemberCard";
import { Button } from "./ui/button";

import MemberApiRequest from "@/apiRequest/member";
import { useParams } from "react-router-dom";
interface Adding {
    user_id: string;
    display_name: string;
    avatar: string
}
export default function MemberAdd({ setOpen, resetMember }: { setOpen: React.Dispatch<React.SetStateAction<boolean>>, resetMember: () => Promise<void> }) {
    const { toast } = useToast()
    const [listAdding, setListAdding] = useState<Adding[]>([])
    const [selected, setSelected] = useState("")
    const { clubId } = useParams()

    const getAdding = async () => {
        try {
            const response = await MemberApiRequest.getAdding(clubId)
            console.log(response)
            // Giả sử API trả về mảng các object có cấu trúc tương tự Item
            setListAdding(response.payload.data);

        } catch (error) {
        }
    }
    useEffect(() => {
        getAdding();
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
            resetMember()
            console.log(res)
            toast({
                description: "Success",
            })
            setOpen(false)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="p-2 overflow-auto">
            <h1 className="text-[24px] mb-2 text-white font-bold">Bạn bè</h1>
            <div className="p-2 text-[16px] space-y-2">

                {
                    listAdding.map((friend, index) => (
                        <div key={index} onClick={() => handleSelect(friend.user_id)}
                            className={`p-1 rounded-sm cursor-pointer ${selected == friend.user_id ? 'bg-slate-300' : ''}`}
                        >
                            <MemberCard name={friend.display_name} noMore={true} id={friend.user_id} avatar={friend.avatar}></MemberCard>
                        </div>
                    ))

                }

            </div>
            <div className="flex">
                <Button className="ml-auto" variant={"accept"} onClick={handleAdd}>Thêm thành viên</Button>
            </div>
        </div>
    )
}
