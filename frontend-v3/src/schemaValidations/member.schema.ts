import { z } from "zod"

export const AddMemberBody = z
    .object({
        user_id: z.string(),
        club_id: z.string(),
    })
    .strict()

export type AddMemberBodyType = z.TypeOf<typeof AddMemberBody>

export const GetMemberRes = z.object({
    message: z.string(),
    data: z.array(z.object({
        display_name: z.string(),
        avatar: z.string(),
        user_id: z.string(),
        role: z.string()
    }))
})
    .strict()
export type GetMemberResType = z.TypeOf<typeof GetMemberRes>