// import * as ScrollArea from '@radix-ui/react-scroll-area';
import Message from "./Message";
import { useEffect } from "react";
import { MessageType, Profile } from "./index"; // Đường dẫn tới file định nghĩa kiểu dữ liệu

type MessageListProps = {
  socketRef: React.RefObject<any>;
  messageRef: React.RefObject<any>;
  messageList: MessageType[];
  setMessagesList: (
    messages: MessageType[] | ((messages: MessageType[]) => MessageType[])
  ) => void;
  userProfile: Profile;
  friendProfile: Profile;
  // isFetching: boolean;
};

function MessageList({
  socketRef,
  messageList,
  setMessagesList,
  userProfile,
  friendProfile,
}: MessageListProps) {
  useEffect(() => {
    // handle New Message socket
    const handleNewMessage = (message: MessageType) => {
      setMessagesList((prevMessages: MessageType[]) => [
        ...prevMessages,
        message,
      ]);
      // console.log('messageList:', messageList);
    };

    const handleDeleteMyMessage = (key: string) => {
      // console.log('Delete my message:', messageId);
      setMessagesList((prevMessagesList) =>
        prevMessagesList.filter((message) => message.id !== key)
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
            userId={userProfile.id}
            key={message.id}
            orientation={message.sender_id == userProfile.id ? "right" : "left"}
            author={
              message.sender_id == userProfile.id
                ? {
                    display_name: userProfile.display_name,
                    avatar: userProfile.avatar,
                  }
                : {
                    display_name: friendProfile.display_name,
                    avatar: friendProfile.avatar,
                  }
            }
            // author={message.sender_id == userProfile.id ? { display_name: message.sender.display_name, avatar: userProfile.avatar }
            //   : { display_name: message.sender.display_name, avatar: friendProfile.avatar }}

            content={{
              message: message.message,
              sender_id: message.sender_id,
              created_at: message.createdAt,
              status: message.status,
              react: message.react,
              id: message.id || "",
              receiver_id: message.receiver_id,
            }}
            socketRef={socketRef}
          />
        ))}
      </div>
    </>
  );
}

export default MessageList;
