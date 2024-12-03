import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
export default function Header() {

    const navigate = useNavigate()
    const { clubId } = useParams();
    // const { clubName } = useParams();
    // const clubName = location.pathname.slice(6)
    // console.log(clubName)
    return (
        <div className="w-full  bg-[#393e46] p-2 flex justify-between items-center">
            <div className="font-bold text-[20px]">Danh sách báo cáo</div>
            <ArrowLeft className="rounded-full hover:bg-[#434343] cursor-pointer" size={30} onClick={() => navigate(/club/${clubId})}></ArrowLeft>

        </div>
    )

}