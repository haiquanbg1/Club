import { GetClubResType, RegisterClubBodyType, RegisterClubResType } from "@/schemaValidations/club.schema";
import http from "../lib/http";




const ClubApiRequest = {
    create: (body: RegisterClubBodyType) => http.post<RegisterClubResType>('/club/create', body),
    get: () => http.get<GetClubResType>("/club")
}

export default ClubApiRequest