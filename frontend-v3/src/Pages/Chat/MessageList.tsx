// import * as ScrollArea from '@radix-ui/react-scroll-area';
import Message from './Message';
import { useEffect, useState } from 'react';

type MessageListProps = {
  socketRef: React.RefObject<any>;
  messageList: string[];
  setMessagesList: (messages: string[]) => void;
};

function MessageList({ socketRef, messageList, setMessagesList }: MessageListProps) {

  useEffect(() => {
    const handleNewMessage = (message: string) => {
      messageList.push(message);
      setMessagesList(messageList);
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

