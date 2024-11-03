import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";


export default function HeaderHome() {
    const navigate = useNavigate();
    return (
        <div className="w-full  bg-[#616161] p-2 flex justify-between items-center">
            <Button variant={"accept"} onClick={() => navigate("/friend")}>Thêm bạn</Button>
            <ArrowLeft className="rounded-full hover:bg-[#434343] cursor-pointer" size={30} onClick={() => navigate("/")}></ArrowLeft>
        </div>
    )
}
