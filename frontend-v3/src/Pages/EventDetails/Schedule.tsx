import { Calendar } from "lucide-react"

interface Schedule {
    id?: string,
    event_id?: string,
    description?: string,
    start_time?: string,
    end_time?: string
}
export default function Schedule({ id, event_id, description, start_time, end_time }: Schedule) {
    return (
        <div className="flex p-4 rounded-xl text-[18px] mt-4 bg-[#393E46] space-x-6 ">
            <div>
                <Calendar size={80}></Calendar>
            </div>
            <div>
                <p>{description}</p>
                <p>{start_time}</p>
            </div>
        </div>
    )
}
