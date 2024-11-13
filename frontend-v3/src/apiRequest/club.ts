import { GetClubResType, RegisterClubBodyType, RegisterClubResType, SendEventBodyType } from "@/schemaValidations/club.schema";
import http from "../lib/http";




const ClubApiRequest = {
    create: (body: FormData) => http.post<RegisterClubResType>('/club/create', body),
    get: () => http.get<GetClubResType>("/club/"),
    getClub: (id: string) => http.get<GetClubResType>(`club/${id}`),
    createEvent: (body: SendEventBodyType) => http.post<any>('/event/create', body),
    changeAvatar: (body: FormData) => http.patch<any>('/club/changeAvatar', body),
}

export default ClubApiRequest