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

export const ChangePasswordForm = z.object({
    curPass: z.string(),
    newPass: z.string(),
    newPassAgain: z.string()
}).strict().superRefine(({ newPass, newPassAgain }, ctx) => {
    if (newPass !== newPassAgain) {
        ctx.addIssue({
            code: 'custom',
            message: 'Mật khẩu không khớp',
            path: ['confirmPassword']
        })
    }
})

export type ChangePasswordFormType = z.TypeOf<typeof ChangePasswordForm>