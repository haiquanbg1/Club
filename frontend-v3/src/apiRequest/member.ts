import { AddMemberBodyType, GetMemberResType } from "@/schemaValidations/member.schema";
import http from "../lib/http";




const MemberApiRequest = {
    get: (body: string) => http.get<GetMemberResType>(`/member/${body}`),
    add: (body: AddMemberBodyType) => http.post<any>('/member/add', body),
    delete: (body: AddMemberBodyType) => http.delete<any>('/member/delete', body),
    out: (body: any) => http.delete<any>('/member/out', body),
    getAdding: (body: any) => http.get<GetMemberResType>(`/member/add/${body}`),
    addAdmin: (body: any) => http.post<any>(`/role/add`, body)
}

export default MemberApiRequest