import MemberCard from "@/components/MemberCard";
import { Input } from "./ui/input";
import { CirclePlus } from "lucide-react";
import { Button } from "./ui/button";

const members = [
    {
        name: "Nguyễn Văn A",
        avatar: "https://example.com/avatar1.jpg",
        id: "001"
    },
    {
        name: "Trần Thị B",
        avatar: "https://example.com/avatar2.jpg",
        id: "002"
    },
    {
        name: "Lê Văn C",
        avatar: "https://example.com/avatar3.jpg",
        id: "003"
    },
    {
        name: "Phạm Thị D",
        avatar: "https://example.com/avatar4.jpg",
        id: "004"
    },
    {
        name: "Đỗ Văn E",
        avatar: "https://example.com/avatar5.jpg",
        id: "005"
    },
    {
        name: "Hoàng Thị F",
        avatar: "https://example.com/avatar6.jpg",
        id: "006"
    }
];

export default function MemberBox() {
    return (
        <div className=" bg-[#252525] min-w-[280px] h-screen xl:block hidden">
            <h1 className="text-center font-bold text-[26px]">Danh sách thành viên</h1>
            <div className="flex items-center mt-1 mb-2 pl-2 pr-2">
                <Input className="" placeholder="Tìm kiếm thành viên"></Input>
                <CirclePlus size={30} className=" ml-2 cursor-pointer" />
            </div>
            <div className="pl-2 pr-2 space-y-2">
                {members.map((member, index) => (
                    <MemberCard key={index} name={member.name} id={member.id} avatar={member.avatar}></MemberCard>
                ))}
            </div>
            <div className="text-center absolute bottom-2 right-20">
                <Button variant={"denied"}>Rời câu lạc bộ</Button>
            </div>
        </div>
    )
}
