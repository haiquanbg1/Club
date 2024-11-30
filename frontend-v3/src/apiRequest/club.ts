import { GetClubResType, RegisterClubBodyType, RegisterClubResType, SendEventBodyType } from "@/schemaValidations/club.schema";
import http from "../lib/http";
import { GetEventResType, GetParticipantResType } from "@/schemaValidations/event.schema";




const ClubApiRequest = {
    create: (body: FormData) => http.post<RegisterClubResType>('/club/create', body),
    get: () => http.get<GetClubResType>("/club/?club_id="),
    getClub: (id: string) => http.get<GetClubResType>(`club/${id}`),
    createEvent: (body: SendEventBodyType) => http.post<any>('/event/create', body),
    changeAvatar: (body: FormData) => http.patch<any>('/club/changeAvatar', body),
    getJoinedEvent: (id: string) => http.get<GetEventResType>(`event/joined/${id}`),
    getUnjoinedEvent: (id: string) => http.get<GetEventResType>(`event/unjoined/${id}`),
    getEvent: (info: { event_id: string; id: string }) => http.get<GetEventResType>(`event/${info.id}?event_id=${info.event_id}`),
    joinEvent: (body: { event_id: string }) => http.post<any>(`event/participant/join`, body),
    getParticipantPending: (eventId: string) => http.get<GetParticipantResType>(`event/participant/pending/${eventId}`),
    getParticipantAccepted: (eventId: string) => http.get<GetParticipantResType>(`event/participant/accepted/${eventId}`),
    acceptRequest: (body: { userId: string }) => http.patch<any>('event/participant/accept', body),
    addParticipant: (body: { event_id: string; user_id: string }) => http.post<any>("event/participant/add", body)
}

export default ClubApiRequest