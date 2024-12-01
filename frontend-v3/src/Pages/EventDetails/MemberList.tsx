import MemberCard from "@/components/MemberCard"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,

    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useState, useEffect } from "react";
import MemberDetails from "./MemberDetails";

interface user {
    display_name: string;
    avatar: string;
    user_id: string;
}

interface users {
    members: user[];
    resetMember: () => Promise<void>;
}
export default function MemberList({ members, resetMember }: users) {
    const [open, setOpen] = useState<boolean>(false)
    return (
        <div className="p-4 rounded-xl text-[18px] mt-4 bg-[#393E46] space-y-2 ">
            <div className="text-[20px] font-bold">Danh sách tham gia</div>
            <div className="space-y-4">
                {members.map((member, idx) => (
                    <MemberCard name={member.display_name} noMore={true} key={idx} avatar={member.avatar} />
                ))}
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger className="w-full rounded-lg overflow-hidden text-white bg-[#444a53] hover:bg-[#4e555f] font-bold text-[18px]">
                    <Button className="w-full text-white bg-[#444a53] hover:bg-[#4e555f] font-bold text-[18px]">Xem tất cả</Button>
                </DialogTrigger>
                <DialogContent className="p-4 rounded-xl text-[18px] max-h-[50%] overflow-auto scrollbar-hide mt-4 bg-[#393E46]">
                    <DialogHeader>
                        <DialogTitle>
                            <div className="text-center bg-[#393E46] text-[24px] mb-0">Chi tiết thành viên</div>
                        </DialogTitle>
                    </DialogHeader>
                    <MemberDetails members={members} setOpen={setOpen} resetMember={resetMember} />
                </DialogContent>
            </Dialog>

        </div>
    )
}
