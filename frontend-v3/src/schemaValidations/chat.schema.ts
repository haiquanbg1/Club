import { date, z } from "zod"

export const ChatCreateBody = z
    .object({
        name: z.string(),
        club_id: z.string(),
    })
    .strict()

export type ChatCreateBodyType = z.TypeOf<typeof ChatCreateBody>

export const ChatCreateRes = z.object({
    status: z.string(),
    message: z.string(),
    data: z.object({
        club_id: z.string(),
        name: z.string()
    })
})
export type ChatCreateResType = z.TypeOf<typeof ChatCreateRes>

export const ChatGetRes = z.object({
    status: z.string(),
    message: z.string(),
    data: z.array(z.object({
        conversation_id: z.string(),
        name: z.string()
    }))
})
export type ChatGetResType = z.TypeOf<typeof ChatGetRes>

export const NothingRes = z.object({
    status: z.string(),
    message: z.string(),
})
export type NothingResType = z.TypeOf<typeof NothingRes>
