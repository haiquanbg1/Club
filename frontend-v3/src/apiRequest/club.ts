import { GetClubResType, RegisterClubBodyType, RegisterClubResType, SendEventBodyType } from "@/schemaValidations/club.schema";
import http from "../lib/http";
import { GetEventResType, GetParticipantResType, GetScheduleResType, ScheduleSendBodyType } from "@/schemaValidations/event.schema";




const ClubApiRequest = {
    create: (body: FormData) => http.post<RegisterClubResType>('/club/create', body),
    get: () => http.get<GetClubResType>("/club/?club_id="),
    delete: (body: { club_id: string }) => http.delete<any>("/club/delete", body),
    getClub: (id: string) => http.get<GetClubResType>(`club/?club_id=${id}`),
    createEvent: (body: SendEventBodyType) => http.post<any>('/event/create', body),
    updateEvent: (body: any) => http.patch<any>('/event/update', body),
    deleteEvent: (body: { event_id: string, club_id: string }) => http.delete<any>('/event/delete', body),
    changeAvatar: (body: FormData) => http.patch<any>('/club/changeAvatar', body),
    getJoinedEvent: (id: string) => http.get<GetEventResType>(`event/joined/${id}`),
    getUnjoinedEvent: (id: string) => http.get<GetEventResType>(`event/unjoined/${id}`),
    getEvent: (info: { event_id: string; id: string }) => http.get<GetEventResType>(`event/${info.id}?event_id=${info.event_id}`),
    joinEvent: (body: { event_id: string }) => http.post<any>(`event/participant/join`, body),
    getParticipantPending: (eventId: string) => http.get<GetParticipantResType>(`event/participant/pending/${eventId}`),
    getParticipantAccepted: (eventId: string) => http.get<GetParticipantResType>(`event/participant/accepted/${eventId}`),
    acceptRequest: (body: { event_id: string; user_id: string; club_id: string }) => http.patch<any>('event/participant/accept', body),
    denyRequest: (body: { event_id: string; user_id: string; club_id: string }) => http.delete<any>('event/participant/deny', body),
    addParticipant: (body: { event_id: string; user_id: string; club_id: string }) => http.post<any>("event/participant/add", body),
    kickParticipant: (body: { event_id: string; user_id: string; club_id: string }) => http.delete<any>("event/participant/kick", body),
    outEvent: (body: { event_id: string }) => http.delete<any>('event/out', body),
    createSchedule: (body: ScheduleSendBodyType) => http.post<any>('schedule/create', body),
    getSchedule: (event_id: string) => http.get<GetScheduleResType>(`schedule/${event_id}`),
    updateSchedule: (body: any) => http.patch<any>('schedule/update', body),
    deleteSchedule: (body: { club_id: string, schedule_id: string }) => http.delete<any>(`schedule/delete`, body)
}

export default ClubApiRequest