import { z } from "zod"

export const AddMemberBody = z
    .object({
        user_id: z.string(),
        club_id: z.string(),
    })
    .strict()

export type AddMemberBodyType = z.TypeOf<typeof AddMemberBody>