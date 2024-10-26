import http from "../lib/http";

const FriendApiRequest = {
    add: (body: { user_id: string }) => http.post<any>('/friend/add', body),

}

export default FriendApiRequest