import ClubApiRequest from "@/apiRequest/club";
import ClubHeader from "@/components/ClubHeader";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Pencil } from "lucide-react";
import {
    Dialog,
    // DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import ClubInfoPage from "../ClubInfo";
// import { Button } from "@/components/ui/button";
// import ProfileCard from "../ClubInfo/ProfileCard";
interface Club {
    name: string,
    avatar: string,
    id: string,
    role: string,
    description: string
}
export default function ClubPage() {
    const { clubId } = useParams()
    const [club, setClub] = useState<Club>()
    const [open, setOpen] = useState(false)
    const location = useLocation()
    const getClub = async () => {
        try {
            const res = await ClubApiRequest.get(clubId || "")
            setClub(res.payload.data[0])
        } catch (error) {

        }
    }

    useEffect(() => {
        getClub()
    }
        , [location])


    return (
        <div className="flex flex-col h-screen">
            <ClubHeader />
            <div className='space-y-5 w-full flex-1 pl-[30px] pr-[30px] flex flex-col '>
                {/* <ProfileCard /> */}
                <div className="flex-1"></div>
                <div className="p-10 flex items-center justify-center bg-[#3d3f46] w-10 h-10 rounded-full text-[50px]">
                    <span>#</span>
                </div>
                <div className="">
                    <span className="text-[40px]">Chào mừng bạn đến với #{club?.name}</span>
                </div>
                {
                    club?.role == "Người quản lý" &&
                    (
                        <>
                            <Dialog open={open} onOpenChange={setOpen}>
                                <DialogTrigger>
                                    <div className="flex text-[#4a99ff] w-fit p-2 rounded-lg text-[20px] items-center space-x-2 cursor-pointer hover:bg-[#3d3f46]">
                                        <span><Pencil /></span>
                                        <span>Chỉnh sửa câu lạc bộ</span>
                                    </div>
                                </DialogTrigger>
                                <DialogContent className="max-w-screen bg-[#2b2d31] h-full  ">
                                    <DialogHeader className="h-0 hidden">
                                        <DialogTitle></DialogTitle>
                                        <DialogDescription>
                                        </DialogDescription>
                                    </DialogHeader>
                                    <ClubInfoPage getClub={getClub} description={club.description} name={club.name} avatar={club.avatar} id={club.id} />
                                </DialogContent>
                            </Dialog>
                        </>
                    )
                }
                <div className="h-2"></div>
            </div>
        </div>
    )
}