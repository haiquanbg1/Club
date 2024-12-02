import ClubApiRequest from "@/apiRequest/club"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Schedule from "./Schedule"

interface Schedule {
    id: string,
    title: string,
    description: string,
    start_time: string,
    end_time: string,
    location: string
}


interface Schedules {
    scheduleList: Schedule[],
    resetSchedules?: () => Promise<void>
}

export default function ScheduleList({ scheduleList, resetSchedules }: Schedules) {
    const { eventId } = useParams()

    return (
        <div>
            {
                scheduleList.map((schedule, idx) => (
                    <Schedule id={schedule.id} location={schedule.location} end_time={schedule.end_time} start_time={schedule.start_time} resetSchedules={resetSchedules} description={schedule.description} title={schedule.title} />
                ))
            }

        </div>
    )
}
