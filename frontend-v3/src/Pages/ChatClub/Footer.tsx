import React, { useState } from "react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { FaPaperPlane, FaSmile } from "react-icons/fa";
import { useRef, useEffect } from "react";
import { MessageStatus, Profile } from "../Chat/index";
import { MessageConverType } from "./index";
import axios from "axios";
import { v4 } from "uuid";

type Props = {
  className?: string;
  socketRef: React.RefObject<any>;
  setMessagesList: (
    messages:
      | MessageConverType[]
      | ((messages: MessageConverType[]) => MessageConverType[])
  ) => void;
  userProfile: Profile;
  conversationId: string;
};

export default function Footer({
  className,
  socketRef,
  userProfile,
  conversationId,
}: Props) {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const emojiPickerButtonRef = React.useRef<HTMLButtonElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Gửi tin nhắn qua socket
    if (socketRef.current && conversationId) {
      const messageObject: MessageConverType = {
        id: v4(),
        react: [],
        content: message,
        status: MessageStatus.Show,
        sender_id: userProfile.id,
        createdAt: new Date(),
        sender: {
          display_name: userProfile.display_name,
          avatar: userProfile.avatar,
        },
      };
      socketRef.current.emit("on-chat", messageObject);
      setMessage("");
      // setSelectedImage(null);
      try {
        const response = await axios.post(
          `http://fall2024c8g7.int3306.freeddns.org/api/v1/message/create`,
          {
            id: messageObject.id,
            conversation_id: conversationId,
            content: message,
            status: "show",
          },
          {
            withCredentials: true,
          }
        );
        console.log("Messages create:", response);
      } catch (error) {
        console.error(error);
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
        className="w-full h-9 p-1 ml-1 text-white bg-[#44474e] rounded-3xl flex items-center relative"
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
    </div>
  );
}
