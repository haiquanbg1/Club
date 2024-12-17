// import * as ScrollArea from '@radix-ui/react-scroll-area';
import Message from "../ChatClub/Message";
import { useEffect } from "react";
import { Profile } from "../Chat/index"; // Đường dẫn tới file định nghĩa kiểu dữ liệu
import { MessageConverType } from "./index";
import { ClubProfile } from "./index";

type MessageListProps = {
  socketRef: React.RefObject<any>;
  messageList: MessageConverType[];
  setMessagesList: (
    messages:
      | MessageConverType[]
      | ((messages: MessageConverType[]) => MessageConverType[])
  ) => void;
  userProfile: Profile;
  clubProfile: ClubProfile;
  conversationId: string;
};

function MessageList({
  socketRef,
  messageList,
  setMessagesList,
  userProfile,
}: MessageListProps) {
  useEffect(() => {
    // handle New Message socket
    const handleNewMessage = (message: MessageConverType) => {
      setMessagesList((prevMessages: MessageConverType[]) => [
        ...prevMessages,
        message,
      ]);
    };

    const handleDeleteMyMessage = (messageId: string) => {
      setMessagesList((prevMessagesList) =>
        prevMessagesList.filter((message) => message.id !== messageId)
      );
    };

    const handleDeleteOtherMessage = (messageDeleted: any) => {
      if (userProfile && messageDeleted.userId === userProfile.id) {
        setMessagesList((prevMessagesList) =>
          prevMessagesList.filter(
            (message) => message.id !== messageDeleted.messageId
          )
        );
      }
    };

    if (socketRef.current) {
      socketRef.current.on("on-chat", handleNewMessage);
      socketRef.current.on("delete-my-message", handleDeleteMyMessage);
      socketRef.current.on("delete-other-message", handleDeleteOtherMessage);
    }

    // Cleanup khi component unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.off("on-chat");
        socketRef.current.off("delete-my-message");
        socketRef.current.off("delete-other-message");
      }
    };
  }, [socketRef.current, messageList, socketRef]);

  return (
    <>
      <div>
        {/* {isFetching && <Loading />} */}
        {messageList.map((message) => (
          <Message
            key={message.id}
            orientation={message.sender_id == userProfile.id ? "right" : "left"}
            author={message.sender}
            content={{
              message: message.content,
              sender_id: message.sender_id,
              created_at: message.createdAt,
              react: message.react,
              status: message.status,
              id: message.id || "",
            }}
            userId={userProfile.id}
            socketRef={socketRef}
            userProfile={userProfile}
          />
        ))}
      </div>
    </>
  );
}

export default MessageList;
