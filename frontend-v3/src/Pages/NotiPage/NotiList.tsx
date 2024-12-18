import { useRef } from "react"
import NotiItem from "./NotiItem"

interface notification {
    id: string,
    title: string,
    description: string,

}

export default function NotiList({ notifications, setPage, loading }: { notifications: notification[], setPage?: React.Dispatch<React.SetStateAction<number>>, loading: boolean }) {
    const listRef = useRef<HTMLDivElement>(null);

    const handleScroll = () => {
        if (listRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = listRef.current;
            if (scrollTop + clientHeight >= scrollHeight - 10 && setPage && !loading) {
                setPage((prevPage) => prevPage + 1); // Tăng trang nếu không đang tải
            }
        }
    };
    return (
        <div
            className="bg-[#393e46] flex flex-col overflow-auto rounded-lg w-full p-2 lg:w-[65%] md:w-[70%] space-y-4 xl:w-[60%] ml-auto mr-auto"
            onScroll={handleScroll}
            ref={listRef}
        >
            <div>
                <h1 className="text-[26px] font-bold pl-2">Thông báo</h1>
            </div>
            <div className="flex space-x-6 mt-4 pl-2">
                <h2 className="text-[18px] ">Tất cả</h2>
                <h2 className="text-[18px] ">Chưa đọc</h2>
            </div>
            <div className="space-y-2">
                {notifications.map((notification, idx) => (
                    <NotiItem key={idx} id={notification.id} description={notification.description} title={notification.title}></NotiItem>
                ))}
            </div>
            {loading && (
                <div className="flex justify-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
                </div>
            )}

        </div>
    )
}
