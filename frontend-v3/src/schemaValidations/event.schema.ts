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


export const ScheduleSendBody = z.object({
    event_id: z.string(),
    title: z.string(),
    description: z.string(),
    start_time: z.string(),
    end_time: z.string(),
    location: z.string()
})

export type ScheduleSendBodyType = z.TypeOf<typeof ScheduleSendBody>

export const GetScheduleRes = z.object({
    message: z.string(),
    data: z.array(z.object({
        id: z.string(),
        event_id: z.string(),
        description: z.string(),
        start_time: z.string(),
        end_time: z.string()
    }))
})
    .strict()
export type GetScheduleResType = z.TypeOf<typeof GetScheduleRes>

export const GetParticipantRes = z.object({
    message: z.string(),
    data: z.array(z.object({
        display_name: z.string(),
        avatar: z.string(),
        user_id: z.string()
    }))

})

export type GetParticipantResType = z.TypeOf<typeof GetParticipantRes>
