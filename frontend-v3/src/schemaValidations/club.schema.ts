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
        clubs: z.object({
            name: z.string(),
            description: z.string(),
            avatar: z.string()
        }),
        roleId: z.string(),
        clubId: z.string()
    }))
})
    .strict()
export type GetClubResType = z.TypeOf<typeof GetClubRes>

