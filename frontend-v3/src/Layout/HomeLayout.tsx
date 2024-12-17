import ListFriend from "@/Pages/Home/ListFriend";
import { useEffect } from "react";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        localStorage.setItem("friend", "check")
    }, [])
    return (
        <div className="flex ">
            <div className=" bg-[#2b2d31] min-w-[280px] h-screen flex flex-col">
                <ListFriend />
            </div>
            <div className="w-full flex flex-col h-screen bg-[#313338]">{children}</div>

        </div>
    )
}
