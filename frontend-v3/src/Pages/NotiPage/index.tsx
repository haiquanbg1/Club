import { useEffect, useState, useRef, useCallback } from "react";
import Header from "./Header";
import NotiList from "./NotiList";
import { useParams } from "react-router-dom";
import NotificationApiRequest from "@/apiRequest/notification";

interface Notification {
    id: string;
    title: string;
    description: string;
    status: string;
}

export default function NotificationPage() {
    const listRef = useRef<HTMLDivElement>(null);

    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const { clubId } = useParams<{ clubId: string }>();
    const adminList = localStorage.getItem("adminClubs");
    const [checkRole, setCheckRole] = useState(false);
    const [reload, setReload] = useState(false)

    useEffect(() => {
        if (clubId && adminList?.includes(clubId)) {
            setCheckRole(true);
        }
    }, [clubId, adminList]);

    const getNotifications = useCallback(async () => {
        try {
            setLoading(true);
            const res = await NotificationApiRequest.get(clubId || "", page);
            if (res && res.payload?.data) {
                if (res.payload.data.length === 0) {
                    setHasMore(false)
                    return;
                }
                setNotifications((prev) =>
                    page === 0 ? res.payload.data : [...prev, ...res.payload.data]
                );
            }
        } catch (error) {
            console.error("Error fetching notifications:", error);
        } finally {
            setLoading(false);
        }
    }, [clubId, page, reload]);

    const handleScroll = useCallback(() => {
        if (!hasMore || loading || !listRef.current) return;
        if (listRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = listRef.current;
            if (scrollTop + clientHeight >= scrollHeight - 10 && !loading) {
                setPage((prevPage) => prevPage + 1);
            }
        }
    }, [loading, hasMore]);

    useEffect(() => {
        getNotifications();
    }, [getNotifications]);

    useEffect(() => {
        const currentRef = listRef.current;
        if (currentRef) {
            currentRef.addEventListener("scroll", handleScroll);
        }
        return () => {
            if (currentRef) {
                currentRef.removeEventListener("scroll", handleScroll);
            }
        };
    }, [handleScroll]);

    return (
        <div className="flex flex-col h-screen">
            <Header resetNoti={getNotifications} isAdmin={checkRole} />
            <div
                className="p-2 flex-1 overflow-auto scrollbar-hide"
                ref={listRef}
            >
                <NotiList notifications={notifications} loading={loading} setReload={setReload} />
            </div>
        </div>
    );
}
