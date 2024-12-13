import http from "../lib/http";
import { ChangeAvatarResType, ChangePasswordFormType, UserProfileResType } from "../schemaValidations/profile.schema";
import { MessageResType } from "../schemaValidations/common.schema";



const userApiRequest = {
    getProfile: (id?: string) => http.get<UserProfileResType>(`user/profile/?user_id=${id}`),
    delete: () => http.delete<MessageResType>('user/delete', {}),
    update: (body: any) => http.patch<UserProfileResType>('user/update', body),
    changePassword: (body: ChangePasswordFormType) => http.patch<any>('user/changePassword', body),
    changeAvatar: (body: FormData) => http.patch<ChangeAvatarResType>('user/changeAvatar', body),
}

export default userApiRequest