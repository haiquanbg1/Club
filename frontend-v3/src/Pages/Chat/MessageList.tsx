// import * as ScrollArea from '@radix-ui/react-scroll-area';
import Message from './Message';
import { useEffect, useState} from 'react';
import { MessageType, Profile } from './index'; // Đường dẫn tới file định nghĩa kiểu dữ liệu
import Loading from './Loading';

type MessageListProps = {
  socketRef: React.RefObject<any>;
  messageList: MessageType[];
  setMessagesList: (messages: MessageType[]) => void;
  userProfile: Profile;
  friendProfile: Profile;
  stateScroll: [];
  setStateScroll: (state: []) => void;
  isFetching: boolean;
};

function MessageList({ socketRef, messageList, setMessagesList, userProfile, friendProfile, isFetching }: MessageListProps) {

  useEffect(() => {
    // handle New Message socket
    const handleNewMessage = (message: MessageType) => {
      setMessagesList((prevMessages: MessageType[]) => [...prevMessages, message]);
    };

    if (socketRef.current) {
      socketRef.current.on('on-chat', handleNewMessage);
    }

    // Cleanup khi component unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.off('on-chat');
      }
    };
  }, [socketRef, setMessagesList]);

  return (
    <>
      <div>
        {/* {isFetching && <Loading />} */}
        {messageList.map((message) => (
          <Message
            orientation={(message.sender_id == userProfile.id) ? "right": 'left'}
            author={
              (message.sender_id == userProfile.id) ? 
              { display_name: message.sender_id, avatar: '/images/thang.png' } : 
              { display_name: message.sender_id, avatar: "/images/thao.png" }}
            content={{
              message: message.message,
              sender_id: message.sender_id,
              created_at: message.createdAt,
              id: message.id,}}
          />
        ))}
      </div>
    </>
  );
}

export default MessageList;

