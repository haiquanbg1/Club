import MemberCard from "@/components/MemberCard"
import { Button } from "@/components/ui/button"
import { useState } from "react";

interface user {
    display_name: string;
    avatar: string
}

interface users {
    members: user[]
}
export default function MemberList({ members }: users) {

    return (
        <div className="p-4 rounded-xl text-[18px] mt-4 bg-[#393E46] space-y-2 ">
            <div className="text-[20px] font-bold">Danh sách tham gia</div>
            <div className="space-y-4">
                {members.map((member, idx) => (
                    <MemberCard name={member.display_name} noMore={true} key={idx} avatar={member.avatar} />
                ))}
            </div>
            <Button className="w-full text-white bg-[#444a53] hover:bg-[#4e555f] font-bold text-[18px]">Xem tất cả</Button>
        </div>
    )
}
