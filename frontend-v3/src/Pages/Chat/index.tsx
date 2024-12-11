import Header from "./Header";
import MessageList from "./MessageList";
import Footer from "./Footer";
import socketIOClient from 'socket.io-client';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";

const host = 'http://localhost:8080';

export type UserChat = {
    avatar: string;
    display_name: string;
}

export enum MessageStatus {
    Show = 'show',
    HideForMe = 'hideforme',
    HideForOther = 'hideforother',
}

export type MessageType = {
    id: string;
    message: string;
    sender_id: string;
    receiver_id: string;
    createdAt: Date;
    sender: UserChat;
    react: string;
    status: MessageStatus;
}

export type Profile = {
    id: string;
    display_name: string;
    email: string;
    birthday: Date;
    gender: boolean;
    avatar: string;
}

export default function ChatPage() {

    // friend ID
    const { id: friendId } = useParams<{ id: string }>();

    const location = useLocation();

    const socketRef = useRef<any>(null);

    const messagesRef = useRef<MessageType[]>([]);

    const [messagesList, setMessagesList] = useState<MessageType[]>([]);

    const [friendProfile, setFriendProfile] = useState<Profile | null>(null);

    const [userProfile, setUserProfile] = useState<Profile | null>(null);

    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const [lastScrollTop, setLastScrollTop] = useState(0); // Lưu vị trí scroll trước đó

    const [loading, setLoading] = useState(true); // Cờ để kiểm soát trạng thái loading

    // Trạng thái để kiểm tra lần đầu
    const [isFirstRender, setIsFirstRender] = useState(true);

    const fetchFriendProfile = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/user/profile', {
                params: {
                    user_id: friendId
                },
                withCredentials: true
            });
            setFriendProfile(response.data.data);
            // console.log('Friend profile:', response.data.data);
        } catch (error) {
            console.error('Error fetching friend profile:', error);
        }
    };

    // Fetch dữ liệu người dùng
    const fetchUserProfile = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/user/profile', {
                params: {
                    user_id: '@me'
                },
                withCredentials: true
            });
            setUserProfile(response.data.data);
            // console.log('User profile:', response.data.data);
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };

    const fetchMessages = async (offset = 0) => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:8080/api/v1/message/friend/${friendId}/old`, {
                params: {
                    offset
                },
                withCredentials: true,
                headers: {
                    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                    'Pragma': 'no-cache',
                    'Expires': '0'
                }
            })
            const messages: MessageType[] = response.data.data.map((message: any) => ({
                ...message,
                created_at: new Date(message.created_at)
            })).reverse();
            if ((messagesRef.current.at(0) && messages[0] && messages[0].id != messagesRef.current[0].id)
                || (messagesRef.current.length == 0)) {

                messagesRef.current = [...messages, ...messagesRef.current];
                console.log('fetch 1 lan')
            }

            // console.log('fetch message:', messages);
            setMessagesList(() => [...messagesRef.current]);
        } catch (error) {
            console.error('Error fetching messages:', error);
        } finally {
            setLoading(false); // Tắt trạng thái loading sau khi fetch xong
        }
    };
   
    const connectSocket = async () => {

        const channelId = [userProfile?.id, friendId].sort().join('/');
        // console.log('channelId:', channelId);

        socketRef.current = socketIOClient(host, {
            query: { channelId }
        });

        // Xử lý sự kiện kết nối
        socketRef.current.on('connect', () => {
            socketRef.current.emit('message', 'Hello from vite-react');
        });

        // Xử lý sự kiện ngắt kết nối
        socketRef.current.on('disconnect', () => {
            console.log('Disconnected from server');
        });

        // Xử lý sự kiện kết nối lại thất bại
        socketRef.current.on('reconnect_failed', () => {
            console.log('Failed to reconnect to server');
        });

        // Cleanup khi component unmount
        return () => {
            socketRef.current.disconnect();
        };
    };

    const handleScroll = async (event: any) => {
        const scrollTop = event.target.scrollTop; // Vị trí cuộn hiện tại

        // Điều kiện để fetch dữ liệu: người dùng cuộn lên trên cùng và chưa có yêu cầu fetch nào
        if (scrollTop <= 100 && !loading) {
            console.log('Người dùng cuộn lên trên cùng');
            console.log('lastScrollTop:', lastScrollTop);

            // Fetch dữ liệu
            await fetchMessages(messagesRef.current.length); // Dữ liệu mới (có thể truyền thêm tham số nếu cần)
        }

        // Cập nhật vị trí cuộn trước đó
        setLastScrollTop(scrollTop);
    };

    const setScrollToBottom = () => {
        if (scrollContainerRef.current) {
            // Kiểm tra xem đây có phải là lần đầu render không
            if (isFirstRender) {
                // Cuộn đến cuối khi lần đầu tiên render
                scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
                setIsFirstRender(false);  // Sau khi cuộn lần đầu, đánh dấu đã render lần đầu
            } else {
                // Cuộn một chút so với cuối khi có tin nhắn mới
                scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight - 200; // 100px trước cuối
            }
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await fetchFriendProfile();
            await fetchUserProfile();
            await fetchMessages(); // Fetch tin nhắn
            if (userProfile?.id) {
                connectSocket();
            }
        };
        fetchData();
    }, [friendId, userProfile?.id, location.search]);

    useEffect(setScrollToBottom, [messagesRef.current.length]);

    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;

        if (scrollContainer) {
            scrollContainer.addEventListener('scroll', handleScroll);
        }

        // Cleanup khi component bị hủy
        return () => {
            if (scrollContainer) {
                scrollContainer.removeEventListener('scroll', handleScroll);
            }
        };
    }, [lastScrollTop]);

    useEffect(() => {
        messagesRef.current = messagesList;
    }, [messagesList]);

    return (
        <div className="h-screen flex flex-col bg-gray-700 relative">
            {friendProfile && <Header friendProfile={friendProfile} />}
            {<div ref={scrollContainerRef} className="flex-1 overflow-y-auto p-2 mt-2
                [&::-webkit-scrollbar]:w-2
                [&::-webkit-scrollbar-track]:rounded-full
                [&::-webkit-scrollbar-track]:bg-gray-100
                [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-thumb]:bg-gray-300
                dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
                {userProfile && friendProfile && (
                    <MessageList
                        messageRef={messagesRef}
                        socketRef={socketRef}
                        messageList={messagesList}
                        setMessagesList={setMessagesList}
                        userProfile={userProfile}
                        friendProfile={friendProfile}
                    // isFeatching={loading}
                    />
                )}
            </div>}
            {userProfile && friendProfile && (<Footer className="w-full mt-2"
                socketRef={socketRef}
                setMessagesList={setMessagesList}
                userProfile={userProfile}
                friendProfile={friendProfile}
            />)}
        </div>
    )
}
