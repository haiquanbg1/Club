import { GetClubResType, RegisterClubBodyType, RegisterClubResType, SendEventBodyType } from "@/schemaValidations/club.schema";
import http from "../lib/http";
import { GetEventResType } from "@/schemaValidations/event.schema";




const ClubApiRequest = {
    create: (body: FormData) => http.post<RegisterClubResType>('/club/create', body),
    get: () => http.get<GetClubResType>("/club/?club_id="),
    getClub: (id: string) => http.get<GetClubResType>(`club/${id}`),
    createEvent: (body: SendEventBodyType) => http.post<any>('/event/create', body),
    changeAvatar: (body: FormData) => http.patch<any>('/club/changeAvatar', body),
    getEvent: (id: string) => http.get<GetEventResType>(`event/${id}`),
    joinEvent: (body: { event_id: string }) => http.post<any>(`event/participant/join`, body)
}

export default ClubApiRequest