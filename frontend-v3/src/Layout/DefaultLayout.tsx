// import Header from "../components/header";

import Image from "@/components/image";
// import { ModeToggle } from "@/components/mode-toggle";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import Header from "@/components/header";

// import { useDispatch } from 'react-redux';

// import { setRoles } from "@/redux/clubReducer";
import { useState, useEffect } from 'react';
import ClubApiRequest from "@/apiRequest/club";

interface Club {
    name: string;
    id: string;
    avatar: string;
    role: string;
}


function DefaultLayout({ children }: { children: React.ReactNode }) {
    // const dispatch = useDispatch();
    // const clubId = useSelector((state: RootState) => state.club.clubId);
    const [clubs, setClubs] = useState<Club[]>([
    ]);
    useEffect(() => {
        // Hàm fetch dữ liệu từ API
        localStorage.setItem("call", "true")
        const fetchData = async () => {
            try {
                const response = await ClubApiRequest.get("")
                const clubsData = response.payload.data.map((item) => ({
                    name: item.name || "",
                    id: item.id,
                    avatar: item.avatar,
                    role: item.role
                }));
                const adminClubsIds = clubsData
                    .filter(club => club.role === 'Người quản lý') // Lọc câu lạc bộ bạn là admin
                    .map(club => club.id); // Lấy id của các câu lạc bộ đó
                // Lưu vào localStorage
                localStorage.setItem('adminClubs', JSON.stringify(adminClubsIds));
                // Giả sử API trả về mảng các object có cấu trúc tương tự Item
                setClubs(clubsData);
            } catch (error) {

            }
        };

        fetchData();  // Gọi hàm fetch khi component render lần đầu
    }, [localStorage.getItem("call")]);
    const handleSelectClub = (club_id: string) => {
        // dispatch(setClubId(club_id));
        // dispatch(setRoles(club_id, club_role))
        localStorage.setItem('club_id', club_id)

        navigate(`/club/${club_id}`)
    }

    const navigate = useNavigate()
    return (
        <div className='flex h-screen overflow-hidden bg-[#1e1f22]' >
            <div className=" p-2 justify-between h-full flex flex-col w-[60px] overflow-y-auto scrollbar-hide">
                <div>
                    <div className="mb-4" onClick={() => navigate("/")}>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div className="w-[44px] h-[44px] rounded-xl cursor-pointer flex justify-start items-center">
                                        <div className="rounded-full bg-slate-300 h-full w-full p-2 hover:bg-violet-500 hover:rounded-xl">
                                            <Image src="https://logos-world.net/wp-content/uploads/2020/12/Discord-Logo.png" alt=""></Image>
                                        </div>
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent side="left">
                                    <p>Tin nhắn hệ thống</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    {
                        clubs.map((club, index) => (
                            <div className="mb-3" key={index} onClick={() => handleSelectClub(club.id)}>
                                <TooltipProvider key={index}>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <div className="w-[44px] h-[44px] cursor-pointer overflow-hidden  transition-all duration-50">
                                                <img
                                                    src={club.avatar}
                                                    className="w-full h-full object-cover rounded-full hover:rounded-xl transition-all duration-50"
                                                    alt=""
                                                />
                                            </div>
                                            {/* <div className="w-[40px] h-[40px] rounded-full cursor-pointer flex items-center justify-center bg-slate-300 group hover:rounded-xl hover:bg-violet-500 transition-all duration-300">
                                                <img src={club.avatar} className="h-[80%] w-[80%] object-cover rounded-full transition-all duration-300" alt="" />
                                            </div> */}
                                        </TooltipTrigger>
                                        <TooltipContent side="left">
                                            <p>{club.name}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        ))
                    }
                    <div className="w-[44px] h-[44px] rounded-xl cursor-pointer flex justify-start items-center" onClick={() => navigate('/createClub')}>
                        <Plus className="rounded-full bg-slate-700 h-full w-full p-2 hover:bg-green-500 hover:rounded-xl"></Plus>
                    </div>
                </div>

                <div className="mt-auto">
                    <Header />
                    {/* <ModeToggle></ModeToggle> */}
                </div>
            </div>

            <div className="w-full h-full overflow-auto bg-[#2b2d31]">{children}</div>

        </div>
    );
}

export default DefaultLayout;