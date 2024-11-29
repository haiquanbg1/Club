import { z } from "zod"

export const GetEventRes = z.object({
    message: z.string(),
    data: z.array(z.object({
        name: z.string(),
        description: z.string(),
        event_id: z.string(),
        date: z.string()
    }))
})
    .strict()
export type GetEventResType = z.TypeOf<typeof GetEventRes>

export const ScheduleBody = z.object({
    club_id: z.string(),
    name: z.string(),
    description: z.string(),
    start_time: z.date(),
    end_time: z.date()
})

export type ScheduleBodyType = z.TypeOf<typeof ScheduleBody>
