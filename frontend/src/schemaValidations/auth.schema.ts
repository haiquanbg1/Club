import { z } from "zod"

export const RegisterBody = z
    .object({
        name: z.string().trim().min(2).max(256),
        username: z.string().email(),
        password: z.string().min(6).max(100),
        confirmPassword: z.string().min(6).max(100)
    })
    .strict()
    .superRefine(({ confirmPassword, password }, ctx) => {
        if (confirmPassword !== password) {
            ctx.addIssue({
                code: 'custom',
                message: 'Mật khẩu không khớp',
                path: ['confirmPassword']
            })
        }
    })

export type RegisterBodyType = z.TypeOf<typeof RegisterBody>

export const RegisterRes = z.object({
    data: z.object({
        expiresAt: z.string(),
        account: z.object({
            id: z.number(),
            name: z.string(),
            email: z.string()
        })
    }),
    message: z.string()
})
export type RegisterResType = z.TypeOf<typeof RegisterRes>


export const loginBody = z.object({
    username: z.string().email(),
    password: z.string().min(6).max(100)
}).strict()

export type LoginBodyType = z.TypeOf<typeof loginBody>

export const LoginRes = z.object({
    data: z.object({
        token: z.string(),
        account: z.object({
            id: z.number(),
            name: z.string(),
            email: z.string()
        })
    }),
    message: z.string()
})
export type LoginResType = z.TypeOf<typeof LoginRes>

export const OtpBody = z.object({
    pin: z.string().min(6, {
        message: "Your one-time password must be 6 characters.",
    }),
}).strict()

export type OtpBodyType = z.TypeOf<typeof OtpBody>
