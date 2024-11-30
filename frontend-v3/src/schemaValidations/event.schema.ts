import { z } from "zod"

export const GetEventRes = z.object({
    message: z.string(),
    data: z.array(z.object({
        name: z.string(),
        description: z.string(),
        event_id: z.string(),
        start_time: z.string(),
        status: z.string()
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

export const GetParticipantRes = z.object({
    message: z.string(),
    data: z.array(z.object({
        display_name: z.string(),
        avatar: z.string(),
    }))

})

export type GetParticipantResType = z.TypeOf<typeof GetParticipantRes>
