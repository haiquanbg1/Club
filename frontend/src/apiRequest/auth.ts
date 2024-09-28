import http from "@/lib/http";
import { LoginBodyType, LoginResType, RegisterBodyType, RegisterResType } from "@/schemaValidations/auth.schema";
import { MessageResType } from "@/schemaValidations/common.schema";



const authApiRequest = {
    login: (body: LoginBodyType) => http.post<LoginResType>('auth/login', body),
    registerOTP: (OTP: string) => http.post<MessageResType>('auth/register/otp', OTP),
    register: (body: RegisterBodyType) => http.post<RegisterResType>('auth/register', body),
}

export default authApiRequest