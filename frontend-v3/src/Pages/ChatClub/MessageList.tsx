// import * as ScrollArea from '@radix-ui/react-scroll-area';
import Message from '../ChatClub/Message';
import { useEffect } from 'react';
import { Profile } from '../Chat/index'; // Đường dẫn tới file định nghĩa kiểu dữ liệu
import { MessageConverType } from './index';
import axios from "axios";

type MessageListProps = {
  socketRef: React.RefObject<any>;
  messageList: MessageConverType[];
  setMessagesList: (messages: MessageConverType[] | ((messages: MessageConverType[]) => MessageConverType[])) => void;
  userProfile: Profile;
};

function MessageList({ socketRef, messageList, setMessagesList, userProfile }: MessageListProps) {

  useEffect(() => {
    // handle New Message socket
    const handleNewMessage = (message: MessageConverType) => {
      setMessagesList((prevMessages: MessageConverType[]) => [...prevMessages, message]);
    };

    const handleDeleteMessage = async (messageId: string) => {
      try {
        const response = await axios.delete(`http://localhost:8080/api/v1/message/delete`, {
          params: {
            message_id: messageId
          },
          withCredentials: true
        })
        if (response.status === 200) {
          console.log('Delete message success');
        } else {
          console.error('Delete message failed');
        }

      } catch (error) {
        console.error(error);
      }
      messageList = messageList.filter((message) => message.id !== messageId);
      setMessagesList(messageList);
    };

    if (socketRef.current) {
      socketRef.current.on('on-chat', handleNewMessage);
      socketRef.current.on('delete-message', handleDeleteMessage);
    }

    // Cleanup khi component unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.off('on-chat');
      }
    };
  }, [socketRef, messageList]);



  return (
    <>
      <div>
        {/* {isFetching && <Loading />} */}
        {messageList.map((message, index) => (
          <Message
            key={message.id || index}
            orientation={(message.sender_id == userProfile.id) ? "right" : 'left'}
            author={{display_name : message.display_name, avatar : message.avatar}}
            content={{
              message: message.content,
              sender_id: message.sender_id,
              created_at: message.createdAt,
              id: message.id || '',
            }}
            socketRef={socketRef}
          />
        ))}
      </div>
    </>
  );
}

export default MessageList;

