import http from "../lib/http";
import { ChangePasswordFormType, UserProfileResType } from "../schemaValidations/profile.schema";
import { MessageResType } from "../schemaValidations/common.schema";



const userApiRequest = {
    getProfile: () => http.get<UserProfileResType>('user/profile'),
    delete: () => http.delete<MessageResType>('user/delete', {}),
    update: (body: any) => http.patch<UserProfileResType>('user/update', body),
    changePassword: (body: ChangePasswordFormType) => http.patch<any>('user/changePassword', body),
    changeAvatar: (body: FormData) => http.patch<any>('user/changeAvatar', body),
}

export default userApiRequest