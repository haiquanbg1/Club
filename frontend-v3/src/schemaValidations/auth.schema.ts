import { z } from "zod"

export const RegisterBody = z
    .object({
        display_name: z.string(),
        gender: z.number(),
        birthday: z.string(),
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

    message: z.string()
})
export type RegisterResType = z.TypeOf<typeof RegisterRes>


export const loginBody = z.object({
    username: z.string().email(),
    password: z.string().min(6).max(100)
}).strict()

export type LoginBodyType = z.TypeOf<typeof loginBody>

export const LoginRes = z.object({
    message: z.string(),
    data: z.object({
        user: z.object({
            display_name: z.string(),
            username: z.string(),
            avatar: z.string(),
            id: z.string()
        }),
        accessToken: z.string(),
        refreshToken: z.string()
    })
})
export type LoginResType = z.TypeOf<typeof LoginRes>

export const OtpBody = z.object({
    otp: z.string().min(6, {
        message: "Your one-time password must be 6 characters.",
    })
}).strict()

export type OtpBodyType = z.TypeOf<typeof OtpBody>

export const VerifyOtpBody = z.object({
    otp: z.string().min(6),
    username: z.string().email()
}).strict()

export type VerifyOtpBodyType = z.TypeOf<typeof VerifyOtpBody>

export function validateDate(dateString: string) {
    // Regular Expression để kiểm tra định dạng yyyy/mm/dd
    const regex = /^\d{4}\/\d{2}\/\d{2}$/;

    // Kiểm tra định dạng có đúng không
    if (!regex.test(dateString)) {
        return false;
    }

    // Chia nhỏ chuỗi ngày tháng năm
    const [year, month, day] = dateString.split('/').map(Number);

    // Tạo đối tượng Date từ ngày tháng
    const date = new Date(year, month - 1, day);

    // Kiểm tra tính hợp lệ của ngày
    if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) {
        return false;
    }

    return true;
}