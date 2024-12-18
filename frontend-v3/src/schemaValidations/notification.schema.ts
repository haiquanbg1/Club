import { z } from "zod"

export const NotificationBody = z
    .object({
        title: z.string(),
        description: z.string(),
        club_id: z.string()
    })
    .strict()


export type NotificationBodyType = z.TypeOf<typeof NotificationBody>

export const GetNotificationRes = z
    .object({
        message: z.string(),
        data: z.array(z.object({
            title: z.string(),
            description: z.string(),
            id: z.string(),
            status: z.string(),
        }))
    })
    .strict()


export type GetNotificationResType = z.TypeOf<typeof GetNotificationRes>

