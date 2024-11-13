// import * as ScrollArea from '@radix-ui/react-scroll-area';
import { any } from 'zod';
import Message from './Message';
import { useEffect} from 'react';

type MessageListProps = {
  socketRef: React.RefObject<any>;
  messageList: string[];
  setMessagesList: (messages: string[]) => void;
};

function MessageList({ socketRef, messageList, setMessagesList }: MessageListProps) {

  useEffect(() => {

    // fetch Message List from DB

    const handleNewMessage = (message: string) => {
      setMessagesList((prevMessages: string[]) => [...prevMessages, message]);
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
      <Message orientation="right" author={{ name: "Thắng", imgSrc: "/images/thang.png" }} content="Helloádasd" createdAt={new Date()} />
      <Message orientation="left" author={{ name: "Thảo", imgSrc: "/images/thao.png" }} content="Hi" createdAt={new Date()} />
      <div>
        {messageList.map((message, index) => (
          <Message
            key={index}
            orientation="right"
            author={{ name: "Thắng", imgSrc: "/images/thang.png" }}
            content={message}
            createdAt={new Date()}
          />
        ))}
      </div>
    </>
  );
}

export default MessageList;

