import { GetNotificationResType, NotificationBodyType } from "@/schemaValidations/notification.schema";
import http from "../lib/http";

const NotificationApiRequest = {
    create: (body: NotificationBodyType) => http.post<any>('/notification/create', body),
    get: (club_id: string) => http.get<GetNotificationResType>(`/notification/${club_id}`),

    // get: (clubId: string) => http.get<GetReportResType>(`report/${clubId}`),
    // update: (body: { report_id: string, status: string }) => http.patch<any>(`report/update`, body),
    // delete: (body: { report_id: string }) => http.delete<any>(`report/delete`, body)

}

export default NotificationApiRequest
