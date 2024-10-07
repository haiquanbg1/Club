import http from "@/lib/http";
import { UserProfileResType } from "@/schemaValidations/profile.schema";
import { MessageResType } from "@/schemaValidations/common.schema";



const userApiRequest = {
    getProfile: () => http.get<UserProfileResType>('user/profile', { credentials: 'include' }),
}

export default userApiRequest