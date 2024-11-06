import { Button } from "./ui/button.tsx";
import { useNavigate } from "react-router-dom";

export default function ClubHeader() {
    const navigate = useNavigate()
    return (
        <div className="w-full  bg-[#434242] p-2 flex justify-between items-center">
            <Button onClick={() => navigate("/report")} className="ml-auto bg-[#fffafaa2] text-[white] text-sm hover:bg-[#fffafa75]">Báo cáo</Button>
        </div>
    )
}