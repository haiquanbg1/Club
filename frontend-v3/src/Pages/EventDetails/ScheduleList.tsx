

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


    return (
        <div>
            {
                scheduleList.map((schedule, idx) => (
                    <Schedule key={idx} id={schedule.id} location={schedule.location} end_time={schedule.end_time} start_time={schedule.start_time} resetSchedules={resetSchedules} description={schedule.description} title={schedule.title} />
                ))
            }

        </div>
    )
}
