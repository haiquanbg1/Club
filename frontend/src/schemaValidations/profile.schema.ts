import { z } from "zod"


export const userProfile = z.object({
    display_name: z.string(),
    email: z.string(),
    birthday: z.string(),
    gender: z.number()
}).strict()

export type UserProfileType = z.TypeOf<typeof userProfile>

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