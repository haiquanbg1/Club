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
const test = [
    "https://images2.thanhnien.vn/528068263637045248/2024/1/25/e093e9cfc9027d6a142358d24d2ee350-65a11ac2af785880-17061562929701875684912.jpg",
    "https://d1hjkbq40fs2x4.cloudfront.net/2016-01-31/files/1045.jpg",
    "https://images2.thanhnien.vn/528068263637045248/2024/1/25/60f4471b059d7a855e2e34ca0f705292-65a11ad2dafe9880-17061562930471102159734.jpg"
]
import { useState, useEffect } from 'react';
import ClubApiRequest from "@/apiRequest/club";

interface Club {
    name: string;
    description: string;
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
                    name: item.clubs.name || "",
                    description: item.clubs.description,
                    avatar: item.clubs.avatar,
                }));
                // Giả sử API trả về mảng các object có cấu trúc tương tự Item
                setClubs(clubsData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();  // Gọi hàm fetch khi component render lần đầu
    }, []);

    const navigate = useNavigate()
    return (
        <div className='flex overflow-auto'>
            <div className="p-2 justify-between h-screen items-end flex flex-col w-[60px]">
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
                            <div className="mb-3" key={index} onClick={() => navigate(`/club/${club.name}`)}>
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

                <div className="absolute bottom-2">
                    <Header />
                    {/* <ModeToggle></ModeToggle> */}
                </div>
            </div>

            <div className="w-full">{children}</div>

        </div>
    );
}

export default DefaultLayout;