import http from "@/lib/http";
import { LoginBodyType, LoginResType, OtpBodyType, RegisterBodyType, RegisterResType, VerifyOtpBodyType } from "@/schemaValidations/auth.schema";
import { MessageResType } from "@/schemaValidations/common.schema";



const authApiRequest = {
    login: (body: LoginBodyType) => http.post<LoginResType>('auth/login', body, { credentials: 'include' }),
    verifyOTP: (body: VerifyOtpBodyType) => http.post<MessageResType>('auth/verifyOtp', body),
    getOTP: (body: RegisterBodyType) => http.post<RegisterResType>('auth/sendOtp', body),
    register: (body: RegisterBodyType) => http.post<RegisterResType>('auth/register', body),
    logout: () => http.delete<MessageResType>('auth/logout', {}, { credentials: 'include' })
}

export default authApiRequest