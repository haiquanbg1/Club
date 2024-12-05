import { ChatCreateBodyType, ChatCreateResType, ChatGetResType, ChatParticipantGetResType, NothingResType } from "@/schemaValidations/chat.schema";
import http from "../lib/http";




const ChatApiRequest = {
    create: (body: ChatCreateBodyType) => http.post<ChatCreateResType>('/conversation/create', body),
    get: (clubId: string) => http.get<ChatGetResType>(`/conversation/${clubId}`),
    delete: (body: { conversation_id: string }) => http.delete<NothingResType>('/converstion/delete', body),
    getParticipant: (participantId: string) => http.get<ChatParticipantGetResType>(`/conversation/participant/${participantId}`),
}

export default ChatApiRequest
