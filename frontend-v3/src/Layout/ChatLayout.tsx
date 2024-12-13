import userApiRequest from "@/apiRequest/userProfile";
import ListFriend from "@/Pages/Home/ListFriend";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface user {
    id: string,
    display_name: string,
    avatar: string,
    birthday: string,
    gender: boolean
}

export default function HomeLayout({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate()
    const { userId } = useParams()
    const [info, setInfo] = useState<user>()
    const location = useLocation()
    const getProfile = async () => {
        try {
            const res = await userApiRequest.getProfile(userId)
            setInfo(res.payload.data)
        } catch (error) {
        }
    }
    useEffect(() => {
        getProfile()
    }, [location])
    return (
        <div className="flex ">
            <div className=" bg-[#2b2d31] min-w-[280px] h-screen flex flex-col">
                <ListFriend />
            </div>

            <div className="w-full flex flex-col h-screen bg-[#313338] border-r-[0.5px] border-r-[#2f3031]">{children}</div>
            <div className="min-w-[300px] flex flex-col bg-[#313338] p-[60px] pt-10">
                <div className="flex-1">
                    <div className="flex flex-col items-center space-y-2 ">
                        <div className=" w-[120px] rounded-full overflow-hidden">
                            <img src={info?.avatar} className="w-full h-full "></img>
                        </div>
                        <div>
                            <p className="font-semibold text-[22px]">{info?.display_name}</p>
                        </div>
                        <Button className="text-[16px] font-medium bg-[#2b2d31] text-[white] hover:bg-[#393b41]" onClick={() => navigate(`/userProfile?userId=${userId}`)}>Đi đến trang cá nhân</Button>
                    </div>

                </div>
            </div>
        </div>
    )
}
