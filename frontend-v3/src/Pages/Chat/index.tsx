import Header from "./Header";
import MessageList from "./MessageList";
import Footer from "./Footer";
import socketIOClient from 'socket.io-client';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";

const host = 'http://localhost:8080';

export type UserChat = {
    avatar: string;
    display_name: string;
}

export type MessageType = {
    id?: string;
    message: string;
    sender_id: string;
    receiver_id: string;
    createdAt: Date;
    sender: UserChat;
}

export type Profile = {
    id: string;
    display_name: string;
    email: string;
    birthday: Date;
    gender: boolean;
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
    // for set scroll message list
    const [stateScroll, setStateScroll] = useState<any[]>([]);

    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const [lastScrollTop, setLastScrollTop] = useState(0); // Lưu vị trí scroll trước đó

    const [isFetching, setIsFetching] = useState(false); // Cờ để kiểm soát việc fetch dữ liệu

    const [loading, setLoading] = useState(true); // Cờ để kiểm soát trạng thái loading

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
            const response = await axios.get(`http://localhost:8080/api/v1/message/${friendId}/old`, {
                params: {
                    offset
                },
                withCredentials: true
            })
            const messages: MessageType[] = response.data.data.map((message: any) => ({
                ...message,
                created_at: new Date(message.created_at) 
            })).reverse();
            messagesRef.current = [...messages, ...messagesRef.current];
            setMessagesList(() => [...messagesRef.current]);
        } catch (error) {
            console.error('Error fetching messages:', error);
        } finally {
            setIsFetching(false); // Đặt lại cờ sau khi fetch xong
            setLoading(false); // Tắt trạng thái loading sau khi fetch xong
        }
    };

    const connectSocket = () => {
        // if (!userId) return;

        const channelId = [userProfile?.id, friendId].sort().join('/');
        console.log('channelId:', channelId);

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

        // Lắng nghe sự kiện 'on-chat'
        socketRef.current.on('on-chat', (message: MessageType) => {
            messagesRef.current = [...messagesRef.current, message]; // Cập nhật messagesRef
            setMessagesList([...messagesRef.current]);
        });

        // Cleanup khi component unmount
        return () => {
            socketRef.current.disconnect();
        };
    };

    const handleScroll = async (event: any) => {
        const scrollTop = event.target.scrollTop;

        // Kiểm tra nếu người dùng cuộn lên (scrollTop giảm)
        if (scrollTop < lastScrollTop && !isFetching) {
            console.log('Người dùng cuộn lên');
            console.log('lastScrollTop:', lastScrollTop);
            // fetch API
            setIsFetching(true); // Đặt cờ để ngăn fetch dữ liệu nhiều lần
            await fetchMessages(messagesRef.current.length);
        }

        // Cập nhật vị trí scroll trước đó
        setLastScrollTop(scrollTop);
    };

    const setFistScroll = () => {
        if (scrollContainerRef.current && messagesList.length > 0) {
            scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight - 500;
          }    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await fetchFriendProfile();
            await fetchUserProfile();
            await fetchMessages();       // Fetch tin nhắn
            // sao không set scroll ở đây
            // setFistScroll();
            if (userProfile?.id) {
                connectSocket();
            }
        };
        fetchData();
    }, [friendId, location.search]);

    useEffect(() => {
        setFistScroll();
    }, [messagesRef.current.length]);

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
                        socketRef={socketRef}
                        messageList={messagesList}
                        setMessagesList={setMessagesList}
                        userProfile={userProfile}
                        friendProfile={friendProfile}
                        stateScroll={stateScroll}
                        setStateScroll={setStateScroll}
                        isFeatching={isFetching}
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
