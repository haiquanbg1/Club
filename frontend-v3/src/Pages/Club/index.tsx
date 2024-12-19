import ClubApiRequest from "@/apiRequest/club";
import ClubHeader from "@/components/ClubHeader";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Pencil } from "lucide-react";
// import ProfileCard from "../ClubInfo/ProfileCard";
interface Club {
    name: string,
    avatar: string,
    id: string,
    role: string
}
export default function ClubPage() {
    const { clubId } = useParams()
    const [club, setClub] = useState<Club>()

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
        , [])


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
                        <div className="flex text-[#4a99ff] w-fit p-2 rounded-lg text-[20px] items-center space-x-2 cursor-pointer hover:bg-[#3d3f46]">
                            <span><Pencil /></span>
                            <span>Chỉnh sửa câu lạc bộ</span>
                        </div>
                    )
                }
                <div className="h-2"></div>
            </div>
        </div>
    )
}