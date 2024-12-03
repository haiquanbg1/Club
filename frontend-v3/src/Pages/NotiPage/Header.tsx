import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, CirclePlus } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import NotiForm from "./NotiForm";

interface header {
    resetNoti?: () => Promise<void>
    isAdmin: boolean
}
export default function Header({ isAdmin, resetNoti }: header) {
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()
    const { clubId } = useParams();
    // const { clubName } = useParams();
    // const clubName = location.pathname.slice(6)
    // console.log(clubName)
    return (
        <div className="w-full  bg-[#393e46] p-2 flex justify-between items-center">
            <div className="font-bold text-[20px]">Thông báo</div>
            {isAdmin &&
                <Dialog open={open} onOpenChange={setOpen} >
                    <DialogTrigger>
                        <CirclePlus className="rounded-full hover:bg-[#434343] cursor-pointer" size={30} ></CirclePlus>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className="text-center text-[22px]">Tạo thông báo</DialogTitle>
                            <DialogDescription>
                            </DialogDescription>
                        </DialogHeader>
                        <NotiForm setOpen={setOpen} resetNoti={resetNoti} />
                    </DialogContent>
                </Dialog>
            }

        </div>
    )

}
