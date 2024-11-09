import { Button } from "./ui/button";
import { useNavigate, useLocation } from "react-router-dom";

export default function ClubHeader() {
    const navigate = useNavigate()
    const location = useLocation();
    // const { clubName } = useParams();
    const clubName = location.pathname.slice(6)
    console.log(clubName)
    return (
        <div className="w-full  bg-[#434242] p-2 flex justify-between items-center">
            <Button onClick={() => navigate("/report")} className="ml-auto bg-[#fffafaa2] text-[white] text-sm hover:bg-[#fffafa75]">Báo cáo</Button>
        </div>
    )
}
