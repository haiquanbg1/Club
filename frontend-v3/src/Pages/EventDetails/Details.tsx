import { UserRound, Calendar, BadgeInfo } from "lucide-react"

export default function Details() {
    return (
        <div className="p-4 rounded-xl text-[18px] mt-4 bg-[#393E46] ">
            <div className="text-[22px] font-bold mb-2">Chi tiết sự kiện</div>
            <ul className="space-y-4">
                <li className="flex">
                    <BadgeInfo className="mr-2" />
                    Loại sự kiện
                </li>
                <li className="flex">
                    <Calendar className="mr-2" />
                    Thời gian dự kiến
                </li>
                <li className="flex ">
                    <UserRound className="mr-2" />
                    Số lượng thành viên tham gia
                </li>
            </ul>
        </div>
    )
}
