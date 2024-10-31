import { GetPendingResType } from "@/schemaValidations/friend.schema";
import http from "../lib/http";

const FriendApiRequest = {
    add: (body: { user_id: string }) => http.post<any>('/friend/add', body),
    pending: () => http.get<GetPendingResType>('friend/pending'),
    accept: (body: { user_id: string, display_name: string }) => http.post('/friend/accept', body),
    deny: (body: { user_id: string }) => http.delete('/friend/deny', body),
    getFriend: (body: string) => http.get<GetPendingResType>(`/friend?text=${body}`)
}

export default FriendApiRequest