// import * as ScrollArea from '@radix-ui/react-scroll-area';
import Message from '../Chat/Message';
import { useEffect} from 'react';
import { Profile } from '../Chat/index'; // Đường dẫn tới file định nghĩa kiểu dữ liệu
import { MessageConverType } from './index';

type MessageListProps = {
  socketRef: React.RefObject<any>;
  messageList: MessageConverType[];
  setMessagesList: (messages: MessageConverType[]) => void;
  userProfile: Profile;
};

function MessageList({ socketRef, messageList, setMessagesList, userProfile, isFetching }: MessageListProps) {

  useEffect(() => {
    // handle New Message socket
    const handleNewMessage = (message: MessageConverType) => {
      setMessagesList((prevMessages: MessageConverType[]) => [...prevMessages, message]);
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
            orientation={(message.user_id == userProfile.id) ? "right": 'left'}
            author={
              (message.user_id == userProfile.id) ? 
              { display_name: message.user_id, avatar: '/images/thang.png' } : 
              { display_name: message.user_id, avatar: "/images/thao.png" }}
            content={{
              message: message.content,
              sender_id: message.user_id,
              created_at: message.createdAt,
              id: message.id}}
          />
        ))}
      </div>
    </>
  );
}

export default MessageList;

