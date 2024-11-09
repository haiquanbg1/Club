import React, { useState } from 'react';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import { FaPaperPlane, FaSmile} from 'react-icons/fa';

type Props = {
    className?: string;
    author: string;
}

export default function Footer({ className, author }: Props) {

    const [message, setMessage] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Xử lý gửi tin nhắn ở đây
        console.log('Message sent:', message);
        setMessage(''); // Xóa nội dung input sau khi gửi
    };

    const addEmoji = (emoji: any) => {
        setMessage(prevMessage => prevMessage + emoji.native);
    };

    return (
        <div className={`${className} relative`}>
            <form 
                onSubmit={handleSubmit}
                className="w-full flex items-center p-4 bg-gray-800">
                <input
                    id="msg"
                    type="text"
                    placeholder={`Nhắn ${author}`}
                    required
                    value={message}
                    onChange={handleChange}
                    className='w-full p-2 bg-gray-700 text-white rounded-md'
                />
                <button type="button" onClick={() => setShowEmojiPicker(!showEmojiPicker)} className="ml-4 p-2 bg-blue-500 text-white rounded-md flex items-center">
                    <FaSmile />
                </button>
                <button type="submit" className="ml-4 p-2 bg-blue-500 text-white rounded-md flex items-center">
                    <FaPaperPlane className="mr-2" />
                    Send
                </button>
            </form>
            {showEmojiPicker && (
                <div className="absolute bottom-full right-2 m-4">
                    <Picker data={data} onEmojiSelect={addEmoji} />
                </div>
            )}
        </div>
    )
}