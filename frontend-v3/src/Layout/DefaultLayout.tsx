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
// import { ModeToggle } from '@/components/mode-toggle.tsx'

import { useState, useEffect } from 'react';
import ClubApiRequest from "@/apiRequest/club";

interface Club {
    name: string;
    id: string;
    avatar: string;
}


function DefaultLayout({ children }: { children: React.ReactNode }) {
    const [clubs, setClubs] = useState<Club[]>([
    ]);
    useEffect(() => {
        // Hàm fetch dữ liệu từ API
        const fetchData = async () => {
            try {
                const response = await ClubApiRequest.get()
                console.log(response)
                const clubsData = response.payload.data.map((item) => ({
                    name: item.name || "",
                    id: item.id,
                    avatar: item.avatar,
                }));
                // Giả sử API trả về mảng các object có cấu trúc tương tự Item
                setClubs(clubsData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();  // Gọi hàm fetch khi component render lần đầu
    }, []);
    const handleSelectClub = (club_id: string, club_name: string) => {
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
                                    <div className="w-[40px] h-[40px] rounded-xl cursor-pointer flex justify-start items-center">
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
                            <div className="mb-3" key={index} onClick={() => handleSelectClub(club.id, club.name)}>
                                <TooltipProvider key={index}>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <div className="w-[40px] h-[40px] rounded-xl cursor-pointer flex justify-start items-center">
                                                <div className="rounded-full bg-slate-300 h-full w-full p-2 hover:bg-violet-500 hover:rounded-xl">
                                                    <Image src={club.avatar} alt=""></Image>
                                                </div>
                                            </div>
                                        </TooltipTrigger>
                                        <TooltipContent side="left">
                                            <p>T{club.name}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        ))
                    }
                    <div className="w-[40px] h-[40px] rounded-xl cursor-pointer flex justify-start items-center" onClick={() => navigate('/createClub')}>
                        <Plus className="rounded-full bg-slate-700 h-full w-full p-2 hover:bg-green-500 hover:rounded-xl"></Plus>
                    </div>
                </div>

                <div className="mt-auto">
                    <Header />
                    {/* <ModeToggle></ModeToggle> */}
                </div>
            </div>

            <div className="w-full h-full overflow-auto">{children}</div>

        </div>
    );
}

export default DefaultLayout;