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
    event_id: z.string(),
    title: z.string(),
    description: z.string(),
    start_time: z.date(),
    end_time: z.date(),
    location: z.string()
})

export type ScheduleBodyType = z.TypeOf<typeof ScheduleBody>

export const ScheduleSendBody = z.object({
    event_id: z.string(),
    title: z.string(),
    description: z.string(),
    start_time: z.string(),
    end_time: z.string(),
    location: z.string()
})

export type ScheduleSendBodyType = z.TypeOf<typeof ScheduleSendBody>

export const GetParticipantRes = z.object({
    message: z.string(),
    data: z.array(z.object({
        display_name: z.string(),
        avatar: z.string(),
        user_id: z.string()
    }))

})

export type GetParticipantResType = z.TypeOf<typeof GetParticipantRes>
