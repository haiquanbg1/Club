import { useEffect, useState } from "react";
import Header from "./Header";
import NotiList from "./NotiList";
import { useParams } from "react-router-dom";
import NotificationApiRequest from "@/apiRequest/notification";
import { useRef } from "react";
interface notification {
    id: string,
    title: string,
    description: string,
    status: string,
}

export default function NotificationPage() {
    const listRef = useRef<HTMLDivElement>(null);

    const [notifications, setNotifications] = useState<notification[]>([])
    const [page, setPage] = useState(0)
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
            console.log(res)
            setNotifications((prev) => [...prev, ...res.payload.data]); // Gộp thông báo mới
        } catch (error) {

        } finally {
            setLoading(false); // Kết thúc tải
        }
    }
    const handleScroll = () => {
        if (listRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = listRef.current;
            if (scrollTop + clientHeight >= scrollHeight - 10 && setPage && !loading) {
                console.log("scroll")
                setPage((prevPage) => prevPage + 1); // Tăng trang nếu không đang tải
            }
        }
    };
    useEffect(() => {
        getNotifications()
    }, [clubId, page])
    return (
        <div className="flex flex-col h-screen ">
            <Header resetNoti={getNotifications} isAdmin={checkRole} />
            <div className="p-2 flex-1 overflow-auto scrollbar-hide" onScroll={handleScroll}
                ref={listRef}>
                <NotiList notifications={notifications} loading={loading} />
            </div>
        </div>
    )
}
