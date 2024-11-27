import { Calendar } from "lucide-react"
export default function Schedule() {
    return (
        <div className="flex p-4 rounded-xl text-[18px] mt-4 bg-[#393E46] space-x-6 ">
            <div>
                <Calendar size={80}></Calendar>
            </div>
            <div>
                <p>Tên sự kiện</p>
                <p>Thời gian tham gia</p>
            </div>
        </div>
    )
}
