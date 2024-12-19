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

interface Member {
    display_name: string;
    avatar: string;
    user_id: string;
    role: string
}

function prioritizeManager(members: Member[]): Member[] {
    return members.sort((a, b) => {
        if (a.role === "Người quản lý" && b.role !== "Người quản lý") {
            return -1; // a comes first
        }
        if (a.role !== "Người quản lý" && b.role === "Người quản lý") {
            return 1; // b comes first
        }
        return 0; // keep order for other roles
    });
}

export default function MemberBox() {
    const location = useLocation();
    // const clubId = useSelector((state: RootState) => state.club.clubId);
    const navigate = useNavigate()
    const { toast } = useToast()
    const [members, setMembers] = useState<Member[]>([])
    const { clubId } = useParams()
    const adminList = localStorage.getItem("adminClubs")
    const [checkRole, setCheckRole] = useState(false)
    useEffect(() => {
        if (clubId && adminList?.includes(clubId)) {
            setCheckRole(true)
        }
    }, [location, localStorage])
    const getMember = async () => {
        try {
            const response = await MemberApiRequest.get(clubId || "")
            const sortedMembers = prioritizeManager(response.payload.data)
            setMembers(sortedMembers);
        } catch (error) {

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
            await MemberApiRequest.out(body)
            localStorage.setItem("call", "false")
            navigate("/")
            toast({
                description: "Success",
            })
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
            })
        }
    }

    const handleDelete = async () => {
        try {
            const body = {
                "club_id": clubId || ""
            }
            await ClubApiRequest.delete(body)
            localStorage.setItem("call", "false")
            navigate("/")

        } catch (error) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
            })
        }
    }
    return (
        <div className=" bg-[#2b2d31] min-w-[280px] h-screen xl:block hidden">
            <h1 className="text-center font-bold text-[26px]">Danh sách thành viên</h1>
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
                            <MemberAdd setOpen={setOpen} resetMember={getMember} />
                        </DialogContent>
                    </Dialog>
                }


            </div>
            <div className="pl-2 pr-2 space-y-2">
                {members.map((member, index) => (
                    <MemberCard adminList={member.role == "Người quản lý"} admin={checkRole} resetMember={getMember} key={index} name={member.display_name} noMore={false} id={member.user_id} avatar={member.avatar}></MemberCard>
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
