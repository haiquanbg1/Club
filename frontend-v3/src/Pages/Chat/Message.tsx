import moment from "moment";
import React, { useState, useEffect } from 'react';
import Avatar from './Avatar';
import { FaSmile } from 'react-icons/fa';
import { UserChat } from ".";
import { MdReply } from "react-icons/md";
import EmojiPicker from "./EmojiPicker";
import { MessageStatus } from ".";
// import { MessageType } from ".";
import AlertDeleteMyMes from "./AlertDeleteMyMes";
import AlertDeleteOtherMes from "./AlertDeleteOtherMes";
// import { set } from "date-fns";
import axios from "axios";

type Props = {
    orientation: "left" | "right";
    author: UserChat;
    content: ContentProps;
    socketRef: React.RefObject<any>;
    userId: string;
};

type ContentProps = {
    id: string;
    react: string;
    message: string;
    status: MessageStatus;
    sender_id: string;
    receiver_id: string;
    created_at: Date;
}

export default function Message({
    orientation,
    author,
    content,
    socketRef,
    userId
}: Props) {

    const formatDate = (date: Date) => {
        return moment(date).format("MMMM D, YYYY, HH:mm");
    };

    const [react, setReact] = useState(content.react);

    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const emojiPickerRef = React.useRef<HTMLDivElement>(null);

    const emojiPickerButtonRef = React.useRef<HTMLButtonElement>(null);

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const handleClickOutside = (e: MouseEvent) => {
        if (emojiPickerRef.current
            && emojiPickerButtonRef.current
            && !emojiPickerRef.current.contains(e.target as Node)
            && !emojiPickerButtonRef.current.contains(e.target as Node)) {
            setShowEmojiPicker(false);
        }
    };

    const addEmoji = (emoji: string) => {
        setReact(emoji);
        setShowEmojiPicker(false);
        if (socketRef.current) {
            const messageObject = {
                id: content.id,
                react: emoji,
                userId: userId
            };
            socketRef.current.emit('react', messageObject);
        }
    };

    const removeEmoji = () => {
        setReact('');
        // console.log(react);
        // const messageObject: MessageType = {
        //     id: content.id,
        //     message: content.message,
        //     sender_id: content.sender_id,
        //     receiver_id: content.receiver_id,
        //     createdAt: content.created_at,
        //     react: '',
        //     status: MessageStatus.Show,
        //     sender: author
        // };
        // // console.log('messageObject:', messageObject);
        // socketRef.current.emit('react', messageObject);
    };

    const handleDeleteForMyMessage = () => {
        socketRef.current.emit('delete-my-message', content.id);
        setReact('');
    };

    const handleDeleteForOtherMessage = () => {
        socketRef.current.emit('delete-other-message', { messageId: content.id, userId: userId });
        setReact('');
    };

    const confirmDeleteForMyMessage = () => {
        handleDeleteForMyMessage();
        setIsDeleteDialogOpen(false);
    };

    const confirmDeleteForOtherMessage = () => {
        handleDeleteForOtherMessage();
        setIsDeleteDialogOpen(false);
    };

    const cancelDelete = () => {
        setIsDeleteDialogOpen(false);
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (socketRef.current) {
            console.log('tin 1')
            socketRef.current.on('react', async (message: any) => {
                console.log('react:', message);
                if (message.id === content.id && message.userId !== userId) {
                    console.log('msg change', message)
                    setReact(message.react);
                }
                const token = localStorage.getItem('token');
                try {
                    const response = await axios.patch(`http://localhost:8080/api/v1/message/friend/changeReact`, {
                        message_id: message.id,
                        react: message.react
                    }, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                        withCredentials: true
                    });
                    if (response.status === 200) {
                        console.log('change avatar success');
                    } else {
                        console.error('change avatar failed');
                    }

                } catch (error) {
                    console.error(error);
                }

            });
        }
    }, [react, socketRef.current, socketRef]);



    return (
        <div className={`flex w-full ${orientation === "right" ? "justify-end" : "justify-start"} group relative mt-2 mb-2`}>
            <div className={`flex w-fit max-w-[75%] items-end py-[5px] ${orientation === "right" ? "flex-row-reverse" : "flex-row"} `}>
                <Avatar
                    className={orientation === "right" ? "ml-[10px]" : "mr-[10px]"}
                    size="md"
                    name={author.display_name}
                    imgSrc={author.avatar}
                    orientation={orientation}
                />

                <div className={`flex-1 rounded-2xl px-[10px] py-[6px] ${orientation === "right" ? "bg-red-500" : "bg-green-400"} shadow-md max-w-[75%] relative`}
                    style={{ wordWrap: "break-word", wordBreak: "break-word", whiteSpace: "pre-wrap" }}>
                    <div
                        className={`flex items-end text-sm font-semibold ${orientation === "right"
                            ? "flex-row-reverse text-right"
                            : "flex-row text-left"
                            }`}
                    >

                    </div>
                    <div
                        className={`${orientation === "right" ? "justify-end" : "justify-start"
                            } flex w-full text-base leading-tight light:text-black dark:text-white`}
                    >
                        {content.message.split("/n").map((line, i) => (
                            <React.Fragment key={i}>
                                {line}
                                <br />
                            </React.Fragment>
                        ))}
                    </div>

                    {/* Hover Action */}
                    <div className={`absolute top-full ${orientation === "right" ? "right-full" : "left-full"} hidden group-hover:flex items-center gap-2 bg-none p-1 text-white text-xs rounded shadow-lg`}
                        style={orientation === "right" ? { transform: "translateY(-100%) translateX(-10%)" } : { transform: "translateY(-100%) translateX(10%)" }}
                    >
                        {userId !== content.sender_id ? (
                            <>
                                <button
                                    className="px-1 py-1 bg-slate-400 rounded-3xl hover:bg-blue-600"
                                    type="button"
                                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                                    ref={emojiPickerButtonRef}
                                >
                                    <FaSmile size={18} />
                                </button>
                                <AlertDeleteOtherMes
                                    openState={isDeleteDialogOpen}
                                    setOpenState={setIsDeleteDialogOpen}
                                    handleDeleteConfirm={confirmDeleteForOtherMessage}
                                    handleDeleteCancel={cancelDelete}
                                />
                            </>
                        ) : (
                            <AlertDeleteMyMes
                                openState={isDeleteDialogOpen}
                                setOpenState={setIsDeleteDialogOpen}
                                handleDeleteConfirm={confirmDeleteForMyMessage}
                                handleDeleteCancel={cancelDelete}
                            />
                        )}

                        <button className="px-1 py-1 bg-slate-400 rounded-3xl hover:bg-yellow-600 justify-center"
                            onClick={removeEmoji}>
                            <MdReply size={18} />
                        </button>
                    </div>
                    {/* Hover Time */}
                    <div className={`absolute w-max top-full ${orientation === "right" ? "left-0" : "right-0"} hidden group-hover:flex items-center gap-2 bg-gray-700 text-white text-xs p-1 rounded shadow-lg`}
                        style={orientation === "right" ? { transform: "translateY(-100%) translateX(-180%)" } : { transform: "translateY(-100%) translateX(180%)" }}
                    >
                        <span>{formatDate(content.created_at)}</span>
                    </div>
                    {showEmojiPicker && (
                        <div
                            ref={emojiPickerRef}
                            className={`absolute bottom-full ${orientation === "right" ? "left-0" : "right-0"}`}
                            style={orientation === "right" ? { transform: "translateY(20%) translateX(-50%)" } : { transform: "translateY(20%) translateX(50%)" }}>
                            <EmojiPicker
                                onSelectEmoji={addEmoji}
                            />
                        </div>
                    )}

                    {react !== '' && (
                        <button
                            className={`absolute bottom-0 right-0 bg-slate-300 border rounded-md`}
                            style={{ transform: "translateY(60%)" }}
                            onClick={removeEmoji}
                        >
                            <span>{react}</span>
                        </button>
                    )}

                </div>
            </div>
        </div>

    );
}