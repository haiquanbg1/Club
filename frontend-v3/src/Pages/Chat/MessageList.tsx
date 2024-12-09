// import * as ScrollArea from '@radix-ui/react-scroll-area';
import Message from './Message';
import { useEffect } from 'react';
import { MessageType, Profile } from './index'; // Đường dẫn tới file định nghĩa kiểu dữ liệu
import axios from 'axios';

type MessageListProps = {
  socketRef: React.RefObject<any>;
  messageRef: React.RefObject<any>;
  messageList: MessageType[];
  setMessagesList: (messages: MessageType[] | ((messages: MessageType[]) => MessageType[])) => void;
  userProfile: Profile;
  friendProfile: Profile;
  // isFetching: boolean;
};

function MessageList({ socketRef, messageList, setMessagesList, userProfile, friendProfile }: MessageListProps) {

  useEffect(() => {
    // handle New Message socket
    const handleNewMessage = (message: MessageType) => {
      setMessagesList((prevMessages: MessageType[]) => [...prevMessages, message]);
      // console.log('messageList:', messageList);
    };

    const handleDeleteMyMessage = async (messageId: string) => {
      console.log('Delete my message:', messageId);
      try {
        const response = await axios.delete(`http://localhost:8080/api/v1/message/friend/delete`, {
          data: {  // Sử dụng `data` thay vì `params`
            message_id: messageId
          },
          withCredentials: true
        });
        if (response.status === 200) {
          console.log('Delete success');
        } else {
          console.error('Delete failed');
        }
      } catch (error) {
        console.error(error);
      }

      setMessagesList((prevMessagesList) =>
        prevMessagesList.filter((message) => message.id !== messageId)
      );
    };

    const handleDeleteOtherMessage = async (messageDeleted: any) => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.patch(`http://localhost:8080/api/v1/message/friend/changeStatusMessage`, {
          status: 'hided',
          message_id: messageDeleted.messageId
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          },
          withCredentials: true
        });
        if (response.status === 200) {
          console.log('change success');
        } else {
          console.error('change failed');
        }
      }
      catch (error) {
        console.error(error);
      }
      if (userProfile && messageDeleted.userId === userProfile.id) {
        setMessagesList((prevMessagesList) =>
          prevMessagesList.filter((message) => message.id !== messageDeleted.messageId)
        );
      }
    };

    if (socketRef.current) {
      socketRef.current.on('on-chat', handleNewMessage);
      socketRef.current.on('delete-my-message', async (messageId: string) => {
        await handleDeleteMyMessage(messageId)
      });

      socketRef.current.on('delete-other-message', async (messageDeleted: any) => {
        await handleDeleteOtherMessage(messageDeleted);
      });

    }

    // Cleanup khi component unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.off('on-chat');
        socketRef.current.off('delete-message');
        socketRef.current.off('react');
      }
    };
  }, [socketRef.current, messageList, socketRef]);




  return (
    <>
      <div>
        {/* {isFetching && <Loading />} */}
        {messageList.map((message, index) => (
          (
            <Message
              userId={userProfile.id}
              key={index}
              orientation={(message.sender_id == userProfile.id) ? "right" : 'left'}
              author={message.sender_id == userProfile.id ? { display_name: message.sender.display_name, avatar: userProfile.avatar }
                : { display_name: message.sender.display_name, avatar: friendProfile.avatar }}

              content={{
                message: message.message,
                sender_id: message.sender_id,
                created_at: message.createdAt,
                status: message.status,
                react: message.react,
                id: message.id || '',
                receiver_id: message.receiver_id
              }}
              socketRef={socketRef}
            />
          ))
        )}
      </div>
    </>
  );
}

export default MessageList;

