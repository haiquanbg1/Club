import { z } from "zod"

export const NotificationBody = z
    .object({
        title: z.string(),
        description: z.string(),
        club_id: z.string()
    })
    .strict()


export type NotificationBodyType = z.TypeOf<typeof NotificationBody>

