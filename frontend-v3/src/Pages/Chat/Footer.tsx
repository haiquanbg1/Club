import React, { useState } from 'react';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import { FaPaperPlane, FaSmile } from 'react-icons/fa';
import { CgAdd } from "react-icons/cg";
import { FiImage } from "react-icons/fi";

type Props = {
    className?: string;
    author: string;
    socketRef: React.RefObject<any>;
    setMessagesList: (messages: string[]) => void;
}

export default function Footer({ className, author, socketRef, setMessagesList }: Props) {
    const [message, setMessage] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Gửi tin nhắn qua socket
        if (socketRef.current) {
            socketRef.current.emit('on-chat', message);
        }
        // Thêm tin nhắn mới vào danh sách và cập nhật trạng thái
        setMessagesList((prevMessages) => [...prevMessages, message]);
        setMessage(''); // Xóa nội dung input sau khi gửi
    };

    const addEmoji = (emoji: any) => {
        setMessage(prevMessage => prevMessage + emoji.native);
    };

    return (
        <div className={`${className} relative flex mb-1`}>
            <button className='w-9 h-9 p-2 hover:bg-slate-500 shadow-md rounded-3xl cursor-pointer'>
                <CgAdd size={20}/>
            </button>
            <button className='w-9 h-9 p-2 hover:bg-slate-500 shadow-md rounded-3xl cursor-pointer'>
                <FiImage size={20}/>
            </button>

            <form
                onSubmit={handleSubmit}
                className="w-full h-9 p-1 text-white bg-gray-800 rounded-3xl flex items-center relative">
                <input
                    id="msg"
                    type="text"
                    value={message}
                    placeholder={`Aa`}
                    required
                    onChange={handleChange}
                    className='flex-1 h-full p-1.5 bg-gray-800 text-white rounded-3xl outline-none'
                />
                <button type="button" onClick={() => setShowEmojiPicker(!showEmojiPicker)} className="p-2 text-white hover:bg-slate-500 shadow-sm rounded-3xl cursor-pointer absolute right-0">
                    <FaSmile  size={18}/>
                </button>

            </form>
            <button type="submit" className="ml-2 mr-2 p-2 bg-blue-500 text-white rounded-3xl flex items-center"
                onClick={handleSubmit}>
                <FaPaperPlane size={18} />
            </button>


            {showEmojiPicker && (
                <div className="absolute bottom-full right-2 m-4">
                    <Picker data={data} onEmojiSelect={addEmoji} />
                </div>
            )}
        </div>
    );
}