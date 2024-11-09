import MemberCard from "@/components/MemberCard";
import { Input } from "./ui/input";
import { CirclePlus } from "lucide-react";
import { Button } from "./ui/button";
import {
    Dialog,
    DialogContent,

    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useState, useEffect } from "react";

import { useToast } from "@/hooks/use-toast"
import MemberApiRequest from "@/apiRequest/member";
import MemberAdd from "./MemberAdd";
import { useNavigate } from "react-router-dom";



interface Member {
    display_name: string;
    avatar: string;
    user_id: string
}

export default function MemberBox() {
    const navigate = useNavigate()
    const { toast } = useToast()
    const [members, setMembers] = useState<Member[]>([])
    const getMember = async () => {
        if (localStorage.getItem("club_id") == "") {
            navigate("/")
        }
        try {
            const response = await MemberApiRequest.get(localStorage.getItem("club_id") || "")
            console.log(response)
            // Giả sử API trả về mảng các object có cấu trúc tương tự Item
            setMembers(response.payload.data);

        } catch (error) {

        }
    }
    useEffect(() => {
        getMember();
    }, [])
    const [open, setOpen] = useState<boolean>(false)
    const handleOut = async () => {
        try {
            const body = {
                "club_id": localStorage.getItem("club_id")
            }
            const res = await MemberApiRequest.out(body)
            console.log(res)
            toast({
                description: "Success",
            })
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className=" bg-[#252525] min-w-[280px] h-screen xl:block hidden">
            <h1 className="text-center font-bold text-[26px]">Danh sách thành viên</h1>
            <div className="flex items-center mt-1 mb-2 pl-2 pr-2">
                <Input className="" placeholder="Tìm kiếm thành viên"></Input>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger>
                        <CirclePlus size={30} className=" ml-2 cursor-pointer" />
                    </DialogTrigger>
                    <DialogContent className="bg-[#4F4F4F] p-0 overflow-hidden">
                        <DialogHeader>
                            <DialogTitle>
                                <div className="text-center bg-[#414141] pt-4 pb-4 text-[24px] mb-0">Thêm thành viên</div>
                            </DialogTitle>
                        </DialogHeader>
                        <MemberAdd setOpen={setOpen} resetMember={getMember} />
                    </DialogContent>
                </Dialog>

            </div>
            <div className="pl-2 pr-2 space-y-2">
                {members.map((member, index) => (
                    <MemberCard resetMember={getMember} key={index} name={member.display_name} noMore={false} id={member.user_id} avatar={member.avatar}></MemberCard>
                ))}
            </div>
            <div className="text-center absolute bottom-2 right-20">
                <Button variant={"denied"} onClick={handleOut}>Rời câu lạc bộ</Button>
            </div>
        </div >
    )
}