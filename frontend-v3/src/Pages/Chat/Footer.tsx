import React, { useState } from "react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { FaPaperPlane, FaSmile } from "react-icons/fa";
import { useRef, useEffect } from "react";
import { MessageStatus, MessageType, Profile } from ".";
import axios from "axios";
import { v4 } from "uuid";

type Props = {
  className?: string;
  socketRef: React.RefObject<any>;
  setMessagesList: (
    messages: MessageType[] | ((messages: MessageType[]) => MessageType[])
  ) => void;
  userProfile: Profile;
  friendProfile: Profile;
};

export default function Footer({
  className,
  socketRef,
  userProfile,
  friendProfile,
}: Props) {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const emojiPickerButtonRef = React.useRef<HTMLButtonElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Gửi tin nhắn qua socket
    if (socketRef.current && userProfile && friendProfile) {
      const messageObject: MessageType = {
        id: v4(),
        message: message,
        sender_id: userProfile.id,
        receiver_id: friendProfile.id,
        createdAt: new Date(),
        react: "",
        status: MessageStatus.Show,
        sender: {
          avatar: userProfile.avatar,
          display_name: userProfile.display_name,
        },
      };
      socketRef.current.emit("on-chat", messageObject);
      // console.log("Id:", messageObject.id);
      setMessage(""); // Xóa nội dung input sau khi gửi
      setSelectedImage(null);
      // Gửi tin nhắn qua API
      try {
        const response = await axios.post(
          `http://fall2024c8g7.int3306.freeddns.org/api/v1/message/friend/${friendProfile.id}/send`,
          {
            message: messageObject.message,
            message_id: messageObject.id,
          },
          {
            withCredentials: true,
          }
        );
        // console.log("Messages:", response);
      } catch (error) {
        // console.log(error);
      }
    }
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      emojiPickerRef.current &&
      emojiPickerButtonRef.current &&
      !emojiPickerRef.current.contains(e.target as Node) &&
      !emojiPickerButtonRef.current.contains(e.target as Node)
    ) {
      setShowEmojiPicker(false);
    }
  };

  const addEmoji = (emoji: any) => {
    setMessage((prevMessage) => prevMessage + emoji.native);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={`${className} relative flex mb-1`}>
      <form
        onSubmit={handleSubmit}
        className="w-full ml-1 h-9 p-1 text-white bg-[#44474e] rounded-3xl flex items-center relative"
      >
        <input
          id="msg"
          type="text"
          value={message}
          placeholder={`Aa`}
          required
          onChange={handleChange}
          className="flex-1 h-full p-1.5 bg-[#44474e] text-white rounded-3xl outline-none"
        />
        <button
          type="button"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="p-2 text-white hover:bg-slate-500 shadow-sm rounded-3xl cursor-pointer absolute right-0"
          ref={emojiPickerButtonRef}
        >
          <FaSmile size={18} />
        </button>
      </form>
      <button
        type="submit"
        className="ml-2 mr-2 p-2 bg-[#44474e] text-white rounded-3xl flex items-center"
        onClick={handleSubmit}
      >
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
