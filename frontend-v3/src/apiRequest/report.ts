import http from "../lib/http";

import { GetReportResType } from "@/schemaValidations/club.schema";
const ReportApiRequest = {
    create: (body: { title: string, message: string, club_id: string }) => http.post<any>('/report/create', body),
    get: (clubId: string) => http.get<GetReportResType>(`report/${clubId}`),
    update: (body: { report_id: string, status: string }) => http.patch<any>(`report/update`, body),
    delete: (body: { report_id: string }) => http.delete<any>(`report/delete`, body)

}

export default ReportApiRequest
