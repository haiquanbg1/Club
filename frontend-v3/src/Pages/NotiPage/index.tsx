import Header from "./Header";
import NotiList from "./NotiList";


export default function NotificationPage() {
    return (
        <div className="flex flex-col h-screen">
            <Header />
            <div className="p-2 flex-1 overflow-auto">
                <NotiList />
            </div>
        </div>
    )
}
