import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useNavigate, useParams } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { ClubState } from "@/redux/clubReducer";

export default function ClubHeader() {
    const navigate = useNavigate()
    const { clubId } = useParams();
    // const clubRoles = useSelector((state: { club: ClubState }) => state.club.clubRoles);
    // const roles = clubRoles[clubId || ""];
    const adminList = localStorage.getItem("adminClubs")
    const [checkRole, setCheckRole] = useState(false)
    useEffect(() => {
        if (clubId && adminList?.includes(clubId)) {
            setCheckRole(true)
        }
    }, [])
    // const { clubName } = useParams();
    // const clubName = location.pathname.slice(6)
    // console.log(clubName)
    const handleClick = () => {
        if (checkRole) {
            navigate(`/reportList/${clubId}`)
        }
        else {
            navigate(`/report/${clubId}`)
        }
    }
    return (
        <div className="w-full  bg-[#393e46] p-2 flex justify-between items-center">
            <Button onClick={handleClick} className="ml-auto bg-[#464c56] text-[white] text-sm hover:bg-[#3e444d]">Báo cáo</Button>
        </div>
    )
}
