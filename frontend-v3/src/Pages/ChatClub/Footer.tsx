import React, { useState } from 'react';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import { FaPaperPlane, FaSmile } from 'react-icons/fa';
import { CgAdd } from "react-icons/cg";
import { FiImage } from "react-icons/fi";
import { useRef, useEffect } from 'react';
import { Profile } from '../Chat/index';
import { MessageConverType } from './index';
// import { ClubProfile } from './index';

import axios from 'axios';

type Props = {
    className?: string;
    socketRef: React.RefObject<any>;
    setMessagesList: (messages: MessageConverType[] | ((messages: MessageConverType[]) => MessageConverType[])) => void;
    userProfile: Profile,
    conversationId: string;
}

export default function Footer({ className, socketRef, setMessagesList, userProfile, conversationId }: Props) {
    const [message, setMessage] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const emojiPickerRef = useRef<HTMLDivElement>(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const emojiPickerButtonRef = React.useRef<HTMLButtonElement>(null);

    // console.log('userProfile:', userProfile); 
    // console.log('friendProfile:', friendProfile);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Gửi tin nhắn qua socket
        if (socketRef.current && conversationId && userProfile) {
            const messageObject: MessageConverType = {
                //tạm fix
                id: "",
                react: "",
                content: message,
                sender_id: userProfile.id,
                display_name: userProfile.display_name,
                createdAt: new Date(),
                // avatar: {
                //     avatar: '/images/thang.png',
                // }
                avatar: '/images/thang.png',

            };
            socketRef.current.emit('on-chat', messageObject);
            setMessage('');
            //tạm fix
            setMessagesList([])
            setSelectedImage(null);
            // Gửi tin nhắn qua API
            try {
                const response = await axios.post(`http://localhost:8080/api/v1/message/create`, {
                    content: messageObject.content,
                    conversation_id: conversationId
                }, {
                    withCredentials: true
                });
                console.log('Messages:', response);
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleClickOutside = (e: MouseEvent) => {
        if (emojiPickerRef.current
            && emojiPickerButtonRef.current
            && !emojiPickerRef.current.contains(e.target as Node)
            && !emojiPickerButtonRef.current.contains(e.target as Node)) {
            setShowEmojiPicker(false);
        }
    };

    const addEmoji = (emoji: any) => {
        setMessage(prevMessage => prevMessage + emoji.native);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // setSelectedImage(file);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className={`${className} relative flex mb-1`}>
            <button className='w-9 h-9 p-2 hover:bg-slate-500 shadow-md rounded-3xl cursor-pointer'>
                <CgAdd size={20} />
            </button>
            <label className='w-9 h-9 p-2 hover:bg-slate-500 shadow-md rounded-3xl cursor-pointer'>
                <FiImage size={20} />
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>

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
                <button
                    type="button"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    className="p-2 text-white hover:bg-slate-500 shadow-sm rounded-3xl cursor-pointer absolute right-0"
                    ref={emojiPickerButtonRef}>
                    <FaSmile size={18} />
                </button>

            </form>
            <button type="submit" className="ml-2 mr-2 p-2 bg-blue-500 text-white rounded-3xl flex items-center"
                onClick={handleSubmit}>
                <FaPaperPlane size={18} />
            </button>


            {showEmojiPicker && (
                <div ref={emojiPickerRef} className="absolute bottom-full right-2 m-4">
                    <Picker data={data} onEmojiSelect={addEmoji} />
                </div>
            )}
            {selectedImage && <img src={selectedImage} alt="Selected" width="200" />}
        </div>
    );
}