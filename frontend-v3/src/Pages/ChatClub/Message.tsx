import moment from "moment";
import React, { useState, useEffect } from 'react';
import Avatar from '../Chat/Avatar';
import { FaSmile } from 'react-icons/fa';
import { TiDelete } from "react-icons/ti";
import { UserChat } from "../Chat";
import { MdReply } from "react-icons/md";
import EmojiPicker from "../Chat/EmojiPicker";


type Props = {
    orientation: "left" | "right";
    author: UserChat;
    content: ContentProps;
    socketRef: React.RefObject<any>;
};

type ContentProps = {
    id: string;
    message: string;
    sender_id: string;
    created_at: Date;
}

export default function Message({
    orientation,
    author,
    content,
    socketRef
}: Props) {

    const formatDate = (date: Date) => {
        return moment(date).format("MMMM D, YYYY, HH:mm");
    };

    const [react, setReact] = useState('');

    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const emojiPickerRef = React.useRef<HTMLDivElement>(null);

    const emojiPickerButtonRef = React.useRef<HTMLButtonElement>(null);

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
    };

    const removeEmoji = () => {
        setReact('');
    };

    const handleDeleteMessage = async () => {
        // Xử lý xóa tin nhắn
        // console.log('Delete message', content.id);
        // try {
        //     const response = await axios.delete(`http://localhost:8080/api/v1/message/delete`, {
        //         params: {
        //             message_id: content.id
        //         },
        //         withCredentials: true
        //     })
        //     if (response.status === 200) {
        //         socketRef.current.emit('delete-message', content.id);
        //     } else {
        //         console.error('Delete message failed');
        //     }

        // } catch (error) {
        //     console.error(error);
        // }
        socketRef.current.emit('delete-message', content.id);
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

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
                        <button 
                            className="px-1 py-1 bg-slate-400 rounded-3xl hover:bg-blue-600"
                            type="button"
                            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                            ref={emojiPickerButtonRef}
                            >
                            <FaSmile size={18} />
                        </button>
                        <button 
                            className="px-1 py-1 bg-slate-400 rounded-3xl hover:bg-red-600 justify-center"
                            onClick={handleDeleteMessage}>
                            <TiDelete size={18} />
                        </button>
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

                    {react!== '' && (
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