import socketIOClient from 'socket.io-client';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Profile, UserChat } from '../Chat';
import MessageList from './MessageList.tsx';
import Footer from '../ChatClub/Footer';
import Header from '../ChatClub/Header';
import { MessageStatus } from '../Chat/index';

export type ClubProfile = {
    id: string;
    name: string;
    avatar: string;
    description: string;
}

export type ReactType = {
    id: string;
    message_id: string;
    user_id: string;
    react: string;
    sender: UserChat;
}

export type MessageConverType = {
    id: string;
    content: string;
    react: ReactType[];
    sender_id: string;
    createdAt: Date;
    sender: UserChat;
    status: MessageStatus;
}

export default function ChatPage() {

    // get Param
    const pathname = window.location.pathname;

    const pathParts = pathname.split('/');

    const clubId = pathParts[2];

    const conversationId = pathParts[4];

    const [userProfile, setUserProfile] = useState<Profile | null>(null);

    const [clubProfile, setClubProfile] = useState<ClubProfile | null>(null);

    const location = useLocation();

    // control message List
    const [messagesList, setMessagesList] = useState<MessageConverType[]>([]);

    const messagesRef = useRef<MessageConverType[]>([]);

    const [loading, setLoading] = useState(true);

    // socket
    const socketRef = useRef<any>(null);

    // control scroll
    const [lastScrollTop, setLastScrollTop] = useState(0);

    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const [isFirstRender, setIsFirstRender] = useState(true);

    const fetchUserProfile = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/user/profile', {
                params: {
                    user_id: '@me'
                },
                headers: {
                    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                    'Pragma': 'no-cache',
                },
                withCredentials: true
            });
            setUserProfile(response.data.data);
            // console.log('User profile:', response.data.data);
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };

    const fetchInfoClub = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/club/`, {
                params: {
                    club_id: clubId
                },
                headers: {
                    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                    'Pragma': 'no-cache',
                },
                withCredentials: true
            });
            setClubProfile(response.data.data[0]);
        } catch (error) {
            console.error('Error fetching club profile:', error);
        }
    }

    const fetchMessages = async (offset = 0) => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:8080/api/v1/message/club/${conversationId}/`,{
                params: {
                    offset
                },
                withCredentials: true,
                headers: {
                    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                    'Pragma': 'no-cache',
                    'Expires': '0'
                }
            });
            
            const messages : MessageConverType[] = response.data.data.map((message: MessageConverType) => ({
                ...message,
                createdAt: new Date(message.createdAt)
            })).reverse();
            
            if ((messagesRef.current.at(0) && messages[0] && messages[0].id != messagesRef.current[0].id)
                || (messagesRef.current.length == 0)) {
                messagesRef.current = [...messages, ...messagesRef.current];
                console.log('fetch 1 lan')
            }


            setMessagesList(() => [...messagesRef.current]);
        } catch (error) {
            console.error(error);

        } finally {
            setLoading(false); // Tắt trạng thái loading sau khi fetch xong
        }
    }

    const connectSocket = () => {
        const channelId = `${conversationId}/${clubId}`;

        socketRef.current = socketIOClient('http://localhost:8080', {
            query: {
                channelId
            }
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
    }

    const handleScroll = async (event: any) => {
        const scrollTop = event.target.scrollTop;
        // neeu gan top thi fetch
        if (scrollTop <= 100 && !loading) {
            setLoading(true);
            await fetchMessages(messagesRef.current.length);
        }
        setLastScrollTop(scrollTop);
    }

    const setScrollToBottom = () => {
        if (scrollContainerRef.current) {
            if (isFirstRender) {
                scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
                setIsFirstRender(false);
            }
            scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight - 200;
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await fetchInfoClub();
            await fetchUserProfile();
            await fetchMessages();
            if (conversationId) {
                connectSocket();
            }
        }
        fetchData();
    }, [conversationId, location.search]);

    useEffect(() => { setScrollToBottom() }, [messagesRef.current.length]);

    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;

        if (scrollContainer) {
            scrollContainer.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (scrollContainer) {
                scrollContainer.removeEventListener('scroll', handleScroll);
            }
        }
    }, [lastScrollTop]);

    useEffect(() => {
        messagesRef.current = messagesList;
    }, [messagesList]);

    return (
        <div className="h-screen flex flex-col bg-gray-700 relative">
            {clubProfile && <Header clubProfile={clubProfile} />}
            {<div ref={scrollContainerRef} className="flex-1 overflow-y-auto p-2 mt-2
                [&::-webkit-scrollbar]:w-2
                [&::-webkit-scrollbar-track]:rounded-full
                [&::-webkit-scrollbar-track]:bg-gray-100
                [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-thumb]:bg-gray-300
                dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
                { userProfile && clubProfile &&
                    <MessageList
                        conversationId={conversationId}
                        clubProfile={clubProfile}
                        socketRef={socketRef}
                        messageList={messagesList}
                        setMessagesList={setMessagesList}
                        userProfile={userProfile}
                    />
                }
            </div>}
            {userProfile && (<Footer className="w-full mt-2"
                socketRef={socketRef}
                userProfile={userProfile}
                setMessagesList={setMessagesList}
                conversationId={conversationId || ''} 
            />)}
        </div>
    )
}
