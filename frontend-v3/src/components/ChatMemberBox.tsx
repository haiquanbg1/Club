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
import { useNavigate, useParams } from "react-router-dom";

import { useLocation } from "react-router-dom";
import ClubApiRequest from "@/apiRequest/club";
import ChatApiRequest from "@/apiRequest/chat";

interface Member {
    display_name: string;
    avatar: string;
    user_id: string
}

export default function ChatMemberBox() {
    const location = useLocation();
    // const clubId = useSelector((state: RootState) => state.club.clubId);
    const navigate = useNavigate()
    const { toast } = useToast()
    const [members, setMembers] = useState<Member[]>([])
    const { clubId, conversationId } = useParams()
    const adminList = localStorage.getItem("adminClubs")
    const [checkRole, setCheckRole] = useState(false)
    useEffect(() => {
        if (clubId && adminList?.includes(clubId)) {
            setCheckRole(true)
        }
    }, [location, localStorage])
    // console.log(id)
    // console.log(location)
    const getMember = async () => {
        // const clubId = location.pathname.slice(5)
        // if (localStorage.getItem("club_id") == "") {
        //     navigate("/")
        // }
        try {
            const response = await ChatApiRequest.getParticipant(conversationId || "")
            console.log(response)
            // Giả sử API trả về mảng các object có cấu trúc tương tự Item
            setMembers(response.payload.data);
            console.log(`chat`)
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getMember();
    }, [location])
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

    const handleDelete = async () => {
        try {
            const body = {
                "club_id": clubId || ""
            }
            const res = await ClubApiRequest.delete(body)
            navigate("/")
            console.log(res)
        } catch (error) {

        }
    }
    return (
        <div className=" bg-[#2b2d31] min-w-[280px] h-screen xl:block hidden">
            <h1 className="text-center font-bold text-[26px]">Thành viên đoạn chat</h1>
            <div className="flex items-center mt-1 mb-2 pl-2 pr-2">
                <Input className="bg-[#313338]" placeholder="Tìm kiếm thành viên"></Input>
                {
                    checkRole &&
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
                            <MemberAdd isChat={true} setOpen={setOpen} resetMember={getMember} />
                        </DialogContent>
                    </Dialog>
                }


            </div>
            <div className="pl-2 pr-2 space-y-2">
                {members.map((member, index) => (
                    <MemberCard admin={checkRole} chatPage={true} resetMember={getMember} key={index} name={member.display_name} noMore={false} id={member.user_id} avatar={member.avatar}></MemberCard>
                ))}
            </div>
            {
                checkRole &&
                <div className="text-center absolute bottom-2 right-20">
                    <Button variant={"denied"} onClick={handleDelete}>Xóa câu lạc bộ</Button>
                </div>
            }
            {
                !checkRole &&
                <div className="text-center absolute bottom-2 right-20">
                    <Button variant={"denied"} onClick={handleOut}>Rời câu lạc bộ</Button>
                </div>
            }
        </div >
    )
}
