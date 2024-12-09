import { useState, useEffect } from "react";
import FriendApiRequest from "@/apiRequest/friend"
import { useToast } from "@/hooks/use-toast"
import MemberCard from "@/components/MemberCard";
import { Button } from "./ui/button";

import MemberApiRequest from "@/apiRequest/member";
import { useParams } from "react-router-dom";
import ChatApiRequest from "@/apiRequest/chat";
interface Adding {
    user_id: string;
    display_name: string;
    avatar: string
}
export default function MemberAdd({ setOpen, resetMember, isChat }: { setOpen: React.Dispatch<React.SetStateAction<boolean>>, resetMember: () => Promise<void>, isChat?: boolean }) {
    const { toast } = useToast()
    const [listAdding, setListAdding] = useState<Adding[]>([])
    const [chatAddList, setChatAddList] = useState<Adding[]>([])
    const [selected, setSelected] = useState("")
    const [chatSelected, setChatSelected] = useState("")

    const { clubId, conversationId } = useParams()

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
            club_id: clubId || ""
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

    const getChatAdd = async () => {
        try {
            const res = await MemberApiRequest.get(clubId || "")
            const list = res.payload.data.filter(user => user.user_id != localStorage.getItem("user_id"))
            setChatAddList(list)
        } catch (error) {

        }
    }

    const handleChatSelect = (id: string) => {
        if (id == selected) {
            setChatSelected("")
        }
        else {
            setChatSelected(id)
        }
    }
    const handleAddChat = async () => {
        const body = {
            user_id: chatSelected,
            club_id: clubId || "",
            conversation_id: conversationId || ""
        }

        if (chatSelected == "") {
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
            const res = await ChatApiRequest.addParticipant(body)
            setChatSelected("")
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
    useEffect(() => {
        getChatAdd()
    }, [location])


    return (
        <div className="p-2 overflow-auto">
            {
                !isChat &&
                <>
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
                </>
            }
            {
                isChat &&
                <>
                    <h1 className="text-[24px] mb-2 text-white font-bold">Thành viên câu lạc bộ</h1>

                    <div className="p-2 text-[16px] space-y-2">

                        {
                            chatAddList.map((friend, index) => (
                                <div key={index} onClick={() => handleChatSelect(friend.user_id)}
                                    className={`p-1 rounded-sm cursor-pointer ${chatSelected == friend.user_id ? 'bg-slate-300' : ''}`}
                                >
                                    <MemberCard name={friend.display_name} chatPage={true} noMore={true} id={friend.user_id} avatar={friend.avatar}></MemberCard>
                                </div>
                            ))

                        }

                    </div>
                    <div className="flex">
                        <Button className="ml-auto" variant={"accept"} onClick={handleAddChat}>Thêm thành viên đoạn chat</Button>

                    </div>
                </>
            }

        </div>
    )
}
