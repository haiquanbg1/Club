import { useEffect, useState } from "react";
import ProfileCard from "./ProfileCard";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import ClubApiRequest from "@/apiRequest/club";
import { useToast } from "@/hooks/use-toast";
import MemberApiRequest from "@/apiRequest/member";
import AdminCard from "./AdminCard";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import AdminAdd from "./AdminAdd";
interface Club {
    name: string;
    id: string;
    avatar: string;
    description: string;
    getClub: () => Promise<void>
}
interface User {
    user_id: string,
    display_name: string,
    avatar: string,
    role: string
}

export default function ClubInfoPage({ name, avatar, id, description, getClub }: Club) {
    const { toast } = useToast()
    const [clubName, setClubName] = useState("")
    const { clubId } = useParams()
    const [clubDescription, setClubDescription] = useState("")
    const [change, setChange] = useState(false)
    const [admin, setAdmin] = useState<User[]>([])
    const [members, setMembers] = useState<User[]>([])
    const [open, setOpen] = useState(false)
    const reset = () => {
        setClubDescription("")
        setClubName("")
    }
    const getAdmin = async () => {
        try {
            const res = await MemberApiRequest.get(clubId || "")
            const data = res.payload.data.filter(user => user.role === "Người quản lý");
            const data1 = res.payload.data.filter(user => user.role !== "Người quản lý");
            setMembers(data1)
            setAdmin(data)
        } catch (error) {

        }
    }

    useEffect(() => {
        getAdmin()
    }, [])
    const handleUpdate = async () => {
        const body = {
            name: clubName ? clubName : name,
            description: clubDescription ? clubDescription : description,
            club_id: clubId
        }
        try {
            // console.log(body)
            const res = await ClubApiRequest.change(body)
            // console.log(res)
            getClub()
            reset()
            toast({
                title: "Thành công",
                description: res.payload.message,
            })
        } catch (error) {

        }
    }
    useEffect(() => {
        setChange(clubName != "" || clubDescription != "")
    }, [clubName, clubDescription])
    return (
        <div className='w-full pl-[20px] pr-[20px] md:flex justify-between overflow-auto scrollbar-hide '>
            <div className="lg:flex-[2] md:flex-1 space-y-4 ">
                <div className="w-full pr-28 pt-6 ">
                    <h1 className="text-[22px] text-[#ccc] font-semibold">Tên câu lạc bộ</h1>
                    <input value={clubName} onChange={e => setClubName(e.target.value)} placeholder={name} className="text-[18px]  w-full p-2 rounded-sm outline-none text-[#999] bg-[#313338]"></input>
                    <div className="mt-4 pb-6 border-[solid] border-b-[2px] border-[#3d3f46]"></div>
                </div>
                <div className="w-full pr-28 pt-6">
                    <h1 className="text-[22px] text-[#ccc] font-semibold">Mô tả câu lạc bộ</h1>
                    <textarea value={clubDescription} onChange={e => setClubDescription(e.target.value)} placeholder={description} className="text-[18px] resize-none h-40 scrollbar-hide w-full p-2 rounded-sm outline-none text-[#999] bg-[#313338]"></textarea>
                    <div className="mt-4 pb-6 border-[solid] border-b-[2px] border-[#3d3f46]"></div>
                </div>
                <div className="w-full pr-28 pt-6">
                    <h1 className="text-[22px] text-[#ccc] font-semibold mb-4">Danh sách quản trị viên</h1>
                    <div className="mb-3 space-y-4">
                        {admin.map((ad, idx) => (
                            <AdminCard display_name={ad.display_name} user_id={ad.user_id} avatar={ad.avatar} key={idx} />
                        ))}
                    </div>

                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger>
                            <Button>
                                THêm quả trị viên
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader className="hidden">
                                <DialogTitle></DialogTitle>
                                <DialogDescription>
                                </DialogDescription>
                            </DialogHeader>
                            <AdminAdd getAdmin={getAdmin} setOpen={setOpen} listAdding={members} />
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
            <div className="flex-1">
                <ProfileCard description={description} name={name} avatar={avatar} id={id} />
            </div>
            {
                change && (
                    <div className=" bg-[#1e1f22] p-4 rounded-xl text-[#ccc] flex absolute bottom-3 left-0 right-0 mx-auto w-fit items-center">
                        <p className="mr-8 text-[20px]">Hãy cẩn thận - bạn chưa lưu các thay đổi</p>
                        <div onClick={reset} className="text-[18px] font-semibold mr-8 hover:underline cursor-pointer text-[#ccc]">Đặt lại</div>
                        <Button onClick={handleUpdate} className="text-[18px] text-[#ccc] font-semibold cursor-pointer hover:bg-[#26952682] bg-[#269526a1]">Lưu thay đổi</Button>
                    </div>
                )
            }
        </div>
    )
}
