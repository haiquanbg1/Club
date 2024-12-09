import { io, Socket } from "socket.io-client";

// Định nghĩa kiểu dữ liệu cho các sự kiện
interface ServerToClientEvents {
    receive_group_notification: (data: {
        groupId: string;
        message: string;
        senderId: number;
        timestamp: Date;
    }) => void;
}

interface ClientToServerEvents {
    set_user_id: (userId: number) => void;
    join_group: (groupId: string) => void;
    send_group_notification: (data: {
        groupId: string;
        message: string;
        senderId: number;
    }) => void;
}

// Tạo kết nối với backend
const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io("http://localhost:8080", {
    transports: ["websocket"], // Ưu tiên WebSocket
});

export default socket;
