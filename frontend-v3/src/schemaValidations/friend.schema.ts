import z from 'zod'

export const GetPendingRes = z.object({
    message: z.string(),
    data: z.array(z.object({
        user_id: z.string(),
        friend_id: z.string(),
        display_name: z.string(),
    }))
})
    .strict()
export type GetPendingResType = z.TypeOf<typeof GetPendingRes>