import { z } from "zod"

export const UserProfileRes = z.object({
    message: z.string(),
    data: z.object({
        display_name: z.string(),
        email: z.string(),
        avatar: z.string(),
        birthday: z.string(),
        gender: z.number()
    })
})
export type UserProfileResType = z.TypeOf<typeof UserProfileRes>