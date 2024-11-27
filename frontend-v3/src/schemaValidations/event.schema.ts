import { z } from "zod"

export const GetEventRes = z.object({
    message: z.string(),
    data: z.array(z.object({
        name: z.string(),
        description: z.string(),
        id: z.string(),
        date: z.string()
    }))
})
    .strict()
export type GetEventResType = z.TypeOf<typeof GetEventRes>