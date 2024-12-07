import { ChatCreateBodyType, ChatCreateResType, ChatGetResType, ChatParticipantGetResType, NothingResType } from "@/schemaValidations/chat.schema";
import http from "../lib/http";

const ChatApiRequest = {
    create: (body: ChatCreateBodyType) => http.post<ChatCreateResType>('/conversation/create', body),
    get: (clubId: string) => http.get<ChatGetResType>(/conversation/${clubId}),
    delete: (body: { conversation_id: string }) => http.delete<NothingResType>('/converstion/delete', body),
    getParticipant: (conversationId: string) => http.get<ChatParticipantGetResType>(/conversation/participant/${conversationId}),
addParticipant: (body: { conversation_id: string, user_id: string, club_id: string }) => http.post<NothingResType>(/conversation/participant/add, body),
deleteParticipant: (body: { conversation_id: string, user_id: string, club_id: string }) => http.delete<NothingResType>(/conversation/participant/kick, body),

}

export default ChatApiRequest