import { ChatCreateBodyType, ChatCreateResType, ChatGetResType, NothingResType } from "@/schemaValidations/chat.schema";
import http from "../lib/http";

const ChatApiRequest = {
    create: (body: ChatCreateBodyType) => http.post<ChatCreateResType>('/conversation/create', body),
    get: (clubId: string) => http.get<ChatGetResType>(/conversation/${clubId}),
    delete: (body: { conversation_id: string }) => http.delete<NothingResType>('/converstion/delete', body)
}

export default ChatApiRequest
