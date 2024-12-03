import { z } from "zod"

export const RegisterClubBody = z
    .object({
        name: z.string(),
        description: z.string(),
    })
    .strict()

export type RegisterClubBodyType = z.TypeOf<typeof RegisterClubBody>

export const RegisterClubRes = z.object({

    message: z.string()
})
export type RegisterClubResType = z.TypeOf<typeof RegisterClubRes>


export const GetClubRes = z.object({
    message: z.string(),
    data: z.array(z.object({
        name: z.string(),
        avatar: z.string(),
        id: z.string()
    }))
})
    .strict()
export type GetClubResType = z.TypeOf<typeof GetClubRes>

export const EventBody = z.object({
    club_id: z.string(),
    name: z.string(),
    description: z.string(),
    start_time: z.date()
})

export type EventBodyType = z.TypeOf<typeof EventBody>

export const SendEventBody = z.object({
    club_id: z.string(),
    name: z.string(),
    description: z.string(),
    start_time: z.string()
})

export type SendEventBodyType = z.TypeOf<typeof SendEventBody>

export const GetReportRes = z.object({
    message: z.string(),
    data: z.array(z.object({
        title: z.string(),
        message: z.string(),
        status: z.string(),
        id: z.string()
    }))
})

export type GetReportResType = z.TypeOf<typeof GetReportRes>

export const ScheduleBody = z.object({
    location: z.string(),
    title: z.string(),
    description: z.string(),
    start_time: z.date(),
    end_time: z.date()
})

export type ScheduleBodyType = z.TypeOf<typeof ScheduleBody>