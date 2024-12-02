import { Calendar, Ellipsis } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    // DropdownMenuLabel,
    // DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import ClubApiRequest from "@/apiRequest/club"
import { useParams } from "react-router-dom"
interface Schedule {
    id?: string,
    event_id?: string,
    description?: string,
    start_time?: string,
    end_time?: string,
    resetSchedules?: () => Promise<void>

}
export default function Schedule({ id, event_id, description, resetSchedules, start_time, end_time }: Schedule) {
    const { eventId } = useParams()
    const handleDelete = async () => {
        console.log(eventId)
        console.log(id)

        try {
            const res = await ClubApiRequest.deleteSchedule({ club_id: eventId || "", schedule_id: id || "" })
            if (resetSchedules) {
                resetSchedules()
            }
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex p-4 rounded-xl text-[18px] mt-4 bg-[#393E46] justify-between ">
            <div className="flex space-x-6">
                <div>
                    <Calendar size={80}></Calendar>
                </div>
                <div>
                    <p>{description}</p>
                    <p>{start_time}</p>
                </div>
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Ellipsis className="cursor-pointer" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-gray-200 text-[black]">

                    <DropdownMenuCheckboxItem
                        className="pl-2  text-[18px] focus:bg-gray-300 focus:text-[black]  "
                    >
                        Chỉnh sửa lịch trình
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                        className="pl-2  text-[18px] focus:bg-gray-300 focus:text-[black]"
                        onClick={handleDelete}
                    >
                        Xóa lịch trình
                    </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
