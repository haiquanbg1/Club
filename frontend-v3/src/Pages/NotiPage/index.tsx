import { useEffect, useState } from "react";
import Header from "./Header";
import NotiList from "./NotiList";
import { useParams } from "react-router-dom";
import NotificationApiRequest from "@/apiRequest/notification";

interface notification {
    id: string,
    title: string,
    description: string,
}

export default function NotificationPage() {
    const [notifications, setNotifications] = useState<notification[]>([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const { clubId } = useParams()
    const adminList = localStorage.getItem("adminClubs")
    const [checkRole, setCheckRole] = useState(false)
    useEffect(() => {
        if (clubId && adminList?.includes(clubId)) {
            setCheckRole(true)
        }
    }, [])

    const getNotifications = async () => {
        try {
            setLoading(true);
            const res = await NotificationApiRequest.get(clubId || "", page)
            setNotifications((prev) => [...prev, ...res.payload.data]); // Gộp thông báo mới
        } catch (error) {

        } finally {
            setLoading(false); // Kết thúc tải
        }
    }

    useEffect(() => {
        getNotifications()
    }, [clubId, page])
    return (
        <div className="flex flex-col h-screen">
            <Header resetNoti={getNotifications} isAdmin={checkRole} />
            <div className="p-2 flex-1 overflow-auto scrollbar-hide">
                <NotiList notifications={notifications} setPage={setPage} loading={loading} />
            </div>
        </div>
    )
}
