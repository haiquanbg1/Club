import { useEffect, useState } from "react"

interface Schedule {
    id: string,
    event_id: string,
    description: string,
    start_time: string,
    end_time: string
}

export default function ScheduleList() {
    const [schedules, setSchedules] = useState<Schedule[]>([])

    const getSchedules = async () => {
        try {

        } catch (error) {

        }
    }
    useEffect(() => {

    })
    return (
        <div>ScheduleList</div>
    )
}
