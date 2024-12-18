import { useParams } from "react-router-dom";
import { Button } from "./ui/button";
import { useState } from "react";
import ChatApiRequest from "@/apiRequest/chat";
import { useToast } from "@/hooks/use-toast";

export default function CreateChatForm({ setChatOpen, getChat }: { setChatOpen: React.Dispatch<React.SetStateAction<boolean>>, getChat: Promise<void> }) {
    const { toast } = useToast()
    const { clubId } = useParams()
    const [chatName, setChatName] = useState("")
    const createChat = async () => {
        const body = {
            name: chatName,
            club_id: clubId || ""
        }
        try {
            await ChatApiRequest.create(body)
            toast({
                title: "Thành công",
                description: "Đã tạo thành công đoạn chat",
            })
            setChatName("")
            getChat
            setChatOpen(false)
        } catch (error) {

        }
    }
    return (
        <div className="text-[18px] space-y-6">
            <div className="text-[18px]">
                <label htmlFor="name" className="block">Tên đoạn chat</label>
                <input value={chatName} onChange={(e) => setChatName(e.target.value)} id="name" placeholder="Nhập tên đoạn chat" className="bg-[#393e46] mt-2 w-full p-2 rounded-lg"></input>
            </div>
            <div className="flex">
                <Button onClick={createChat} className="bg-[#393e46] cursor-pointer hover:bg-[#474c57] ml-auto text-[white] text-[18px]">Tạo đoạn chat</Button>
            </div>
        </div>
    )
}
