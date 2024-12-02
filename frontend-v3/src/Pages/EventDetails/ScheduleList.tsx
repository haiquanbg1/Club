import ClubApiRequest from "@/apiRequest/club"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Schedule from "./Schedule"

interface Schedule {
    id: string,
    event_id: string,
    description: string,
    start_time: string,
    end_time: string
}

export default function ScheduleList() {
    const [schedules, setSchedules] = useState<Schedule[]>([])
    const { eventId } = useParams()
    const getSchedules = async () => {
        try {
            const res = await ClubApiRequest.getSchedule(eventId || "")
            console.log(`schedule ${res}`)
            setSchedules(res.payload.data)
        } catch (error) {

        }
    }
    useEffect(() => {
        getSchedules()
    }, [])
    return (
        <div>
            {
                schedules.map((schedule, idx) => (
                    <Schedule start_time={schedule.start_time} description={schedule.description} />
                ))
            }

        </div>
    )
}
