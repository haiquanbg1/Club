import { AddMemberBodyType } from "@/schemaValidations/member.schema";
import http from "../lib/http";




const MemberApiRequest = {
    get: (body: string) => http.get<any>(`/member/:clubId=${body}`),
    add: (body: AddMemberBodyType) => http.post<any>('/member/add', body),
    delete: (body: AddMemberBodyType) => http.delete<any>('/delete', body),
    out: (body: string) => http.delete<any>('/delete', body),
}

export default MemberApiRequest