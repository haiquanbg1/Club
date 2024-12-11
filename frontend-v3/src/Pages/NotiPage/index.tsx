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
            const res = await NotificationApiRequest.get(clubId || "")
            setNotifications(res.payload.data)
        } catch (error) {

        }
    }

    useEffect(() => {
        getNotifications()
    }, [clubId])
    return (
        <div className="flex flex-col h-screen">
            <Header resetNoti={getNotifications} isAdmin={checkRole} />
            <div className="p-2 flex-1 overflow-auto">
                <NotiList notifications={notifications} />
            </div>
        </div>
    )
}
