import http from "@/lib/http";
import { UserProfileResType } from "@/schemaValidations/profile.schema";
import { MessageResType } from "@/schemaValidations/common.schema";



const userApiRequest = {
    getProfile: () => http.get<UserProfileResType>('user/profile', { credentials: 'include' }),
    delete: () => http.delete<MessageResType>('user/delete', {}, { credentials: 'include' }),
    update: (body: any) => http.patch<UserProfileResType>('user/update', body, { credentials: 'include' }),
}

export default userApiRequest