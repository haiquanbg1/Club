import Header from "./Header";
import MessageList from "./MessageList";
import Footer from "./Footer";
import * as ScrollArea from '@radix-ui/react-scroll-area';
import socketIOClient from 'socket.io-client';
import { useEffect, useRef, useState } from 'react';

const host = 'http://localhost:8080';

type Props = {


}

export default function ChatPage() {

    const socketRef = useRef<any>(null);

    const messagesRef = useRef<string[]>([]);

    // List Messages ở đây vì nó còn truyền vào footer khi nhắn thêm vào
    const [messagesList, setMessagesList] = useState<string[]>([]);



    const connectSocket = () => {
        socketRef.current = socketIOClient(host);

        // Xử lý sự kiện kết nối
        socketRef.current.on('connect', () => {
            socketRef.current.emit('message', 'Hello from vite-react');
        });

        // Xử lý sự kiện ngắt kết nối
        socketRef.current.on('disconnect', () => {
            console.log('Disconnected from server');
        });

        // Lắng nghe sự kiện 'on-chat'
        socketRef.current.on('on-chat', (message: string) => {
            messagesRef.current = [...messagesRef.current, message];
            setMessagesList([...messagesRef.current]);
        });

        // Cleanup khi component unmount
        return () => {
            socketRef.current.disconnect();
        };
    };

    const getListMessages = () => {
        const initialMessages = ['Hello', 'Hi', 'How are you?'];
        messagesRef.current = initialMessages;
        setMessagesList(initialMessages);
        // fetch get DB
        // update state
    }

    useEffect(() => {
        getListMessages();
        connectSocket();
    }, []);

    return (
        <div className="h-screen flex flex-col bg-gray-700 relative">
            <Header author="Thang" id="shachi1234" />
            <div className="flex-1 overflow-y-auto p-2 mt-2
                [&::-webkit-scrollbar]:w-2
                [&::-webkit-scrollbar-track]:rounded-full
                [&::-webkit-scrollbar-track]:bg-gray-100
                [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-thumb]:bg-gray-300
                dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
                <MessageList socketRef={socketRef} messageList={messagesList} setMessagesList={setMessagesList} />
            </div>
            <Footer className="w-full mt-2" author="Thang" socketRef={socketRef} setMessagesList={setMessagesList} />
        </div>
    )
}
