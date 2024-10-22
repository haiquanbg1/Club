// import Header from "../components/header";

import Image from "@/components/image";
import { ModeToggle } from "@/components/mode-toggle";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

// import { ModeToggle } from '@/components/mode-toggle.tsx'
const test = [
    "https://images2.thanhnien.vn/528068263637045248/2024/1/25/e093e9cfc9027d6a142358d24d2ee350-65a11ac2af785880-17061562929701875684912.jpg",
    "https://d1hjkbq40fs2x4.cloudfront.net/2016-01-31/files/1045.jpg",
    "https://images2.thanhnien.vn/528068263637045248/2024/1/25/60f4471b059d7a855e2e34ca0f705292-65a11ad2dafe9880-17061562930471102159734.jpg"
]
function DefaultLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className='flex'>
            <div className="p-2 justify-end h-screen items-end relative w-[60px]">
                <div className="mb-4">
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
                    test.map((source, index) => (
                        <div className="mb-3">
                            <TooltipProvider key={index}>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <div className="w-[40px] h-[40px] rounded-xl cursor-pointer flex justify-start items-center">
                                            <div className="rounded-full bg-slate-300 h-full w-full p-2 hover:bg-violet-500 hover:rounded-xl">
                                                <Image src={source} alt=""></Image>
                                            </div>
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent side="left">
                                        <p>Tin nhắn hệ thống</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    ))
                }
                <div className="absolute bottom-2">
                    <ModeToggle></ModeToggle>
                </div>
            </div>

            <div className="w-full">{children}</div>

        </div>
    );
}

export default DefaultLayout;