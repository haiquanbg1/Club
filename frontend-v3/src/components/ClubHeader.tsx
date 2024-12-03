import { Button } from "./ui/button";
import { useNavigate, useParams } from "react-router-dom";

export default function ClubHeader() {
    const navigate = useNavigate()
    const { clubId } = useParams();
    // const { clubName } = useParams();
    // const clubName = location.pathname.slice(6)
    // console.log(clubName)
    return (
        <div className="w-full  bg-[#393e46] p-2 flex justify-between items-center">
            <Button onClick={() => navigate(`/report/${clubId}`)} className="ml-auto bg-[#464c56] text-[white] text-sm hover:bg-[#3e444d]">Báo cáo</Button>
        </div>
    )
}
