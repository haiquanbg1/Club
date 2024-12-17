import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";


export default function HeaderHome() {
    const location = useLocation()

    const navigate = useNavigate();
    return (
        <div className="w-full  bg-[#3d3f46] p-2 flex justify-between items-center">
            {
                !(location.pathname == "/friend") &&
                <Button className="mr-auto" variant={"accept"} onClick={() => navigate("/friend")}>Bạn bè</Button>
            }
            {
                (location.pathname == "/friend") &&
                <ArrowLeft className="rounded-full ml-auto hover:bg-[#434343] cursor-pointer" size={30} onClick={() => navigate("/")}></ArrowLeft>
            }

        </div>
    )
}
