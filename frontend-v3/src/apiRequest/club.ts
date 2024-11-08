import { GetClubResType, RegisterClubBodyType, RegisterClubResType, SendEventBodyType } from "@/schemaValidations/club.schema";
import http from "../lib/http";




const ClubApiRequest = {
    create: (body: FormData) => http.post<RegisterClubResType>('/club/create', body),
    get: () => http.get<GetClubResType>("/club/"),
    createEvent: (body: SendEventBodyType) => http.post<any>('/event/crete', body)
}

export default ClubApiRequest