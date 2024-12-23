import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast"
import MemberCard from "@/components/MemberCard";
import { Button } from "./ui/button";

import MemberApiRequest from "@/apiRequest/member";
import { useParams } from "react-router-dom";
import ClubApiRequest from "@/apiRequest/club";

interface Adding {
    user_id: string;
    display_name: string;
    avatar: string;
}
export default function EventMemberAdd({ setOpen, resetMember, eventList }: { setOpen: React.Dispatch<React.SetStateAction<boolean>>, resetMember: () => Promise<void>, eventList: Adding[] }) {
    const { toast } = useToast()
    const [listAdding, setListAdding] = useState<Adding[]>([])
    const [selected, setSelected] = useState("")
    const { clubId, eventId } = useParams()
    const getAdding = async () => {
        try {
            const response = await MemberApiRequest.get(clubId || "")
            // Giả sử API trả về mảng các object có cấu trúc tương tự Item
            const chatUserIds = new Set(eventList.map((item) => item.user_id));
            const uniqueMembers = response.payload.data.filter((item) => !chatUserIds.has(item.user_id));
            setListAdding(uniqueMembers);
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
            event_id: eventId ? eventId : "",
            club_id: clubId ? clubId : ""
        }

        if (selected == "") {
            toast({
                variant: "destructive",
                description: "Nobody selected",
            })
            return
        }

        if (body.event_id == "") {
            toast({
                variant: "destructive",
                description: "No club selected",
            })
            return
        }

        try {
            await ClubApiRequest.addParticipant(body)
            setSelected("")
            // resetMember()
            resetMember()
            toast({
                description: "Success",
            })
            setOpen(false)
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: error.payload.message,
            })
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
                            <MemberCard resetMember={resetMember} name={friend.display_name} noMore={true} id={friend.user_id} avatar={friend.avatar}></MemberCard>
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
