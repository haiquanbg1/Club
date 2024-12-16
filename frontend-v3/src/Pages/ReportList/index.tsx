import { useEffect, useState } from "react";
import Header from "./Header";
import ReportCard from "./ReportCard";
import { useParams } from "react-router-dom";

import ReportApiRequest from "@/apiRequest/report";

interface report {
    id: string;
    title: string;
    message: string;
    status: string
}

export default function ReportListPage() {
    const [reports, setReports] = useState<report[]>([])
    const [pendingReports, setPendingReports] = useState<report[]>([]);
    const [nonPendingReports, setNonPendingReports] = useState<report[]>([]);
    const { clubId } = useParams()
    const getReports = async () => {
        try {
            const res = await ReportApiRequest.get(clubId || "")
            setReports(res.payload.data)

        } catch (error) {

        }
    }

    useEffect(() => {
        getReports()
    }, [clubId])
    useEffect(() => {
        // Chia reports thành 2 mảng dựa vào status
        const pending = reports.filter(report => report.status === "pending");
        const nonPending = reports.filter(report => report.status !== "pending");

        setPendingReports(pending);
        setNonPendingReports(nonPending);
    }, [reports]); // Mỗi khi mảng reports thay đổi
    return (
        <div className="flex flex-col h-screen ">
            <Header />
            <div className="flex-1 p-4 flex flex-col overflow-auto scrollbar-hide">
                <div className="bg-[#393e46] flex-1 space-y-2 overflow-auto scrollbar-hide p-2">
                    {pendingReports.map((report, idx) => (
                        <ReportCard reset={getReports} key={idx} id={report.id} title={report.title} message={report.message} status={report.status} />
                    ))}
                    {nonPendingReports.map((report, idx) => (
                        <ReportCard reset={getReports} key={idx} id={report.id} title={report.title} message={report.message} status={report.status} />
                    ))}

                </div>
            </div>
        </div>
    )
}
