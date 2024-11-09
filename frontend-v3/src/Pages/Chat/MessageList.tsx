// import * as ScrollArea from '@radix-ui/react-scroll-area';
import Message from './Message';

function MessageList() {
  return (
    <>
      <Message orientation="right" author={{ name: "Thắng", imgSrc: "/images/thang.png" }} content="Helloádasd" createdAt={new Date()} />
      <Message orientation="left" author={{ name: "Thảo", imgSrc: "/images/thao.png" }} content="Hi" createdAt={new Date()} />
      <Message orientation="right" author={{ name: "Thắng", imgSrc: "/images/thang.png" }} content="Dang làm j z" createdAt={new Date()} />
      <Message orientation="left" author={{ name: "Thảo", imgSrc: "/images/thao.png" }} content="chss" createdAt={new Date()} />
      <Message orientation="right" author={{ name: "Thắng", imgSrc: "/images/thang.png" }} content="Xem T1 chưa" createdAt={new Date()} />
      <Message orientation="left" author={{ name: "Thảo", imgSrc: "/images/thao.png" }} content="chưa" createdAt={new Date()} />
      <Message orientation="right" author={{ name: "Thắng", imgSrc: "/images/thang.png" }} content="Xem đi" createdAt={new Date()} />
      <Message orientation="left" author={{ name: "Thảo", imgSrc: "/images/thao.png" }} content="Oke" createdAt={new Date()} />
      <Message orientation="right" author={{ name: "Thắng", imgSrc: "/images/thang.png" }} content="thấnkfasdqweqweqjwkeqjwkekjkjqw /n kejjkqwkj /n ekjqwkjekjqkjwkj" createdAt={new Date()} />
      <Message orientation='left' author={{ name:'Trang', imgSrc:''}} content='Hello' createdAt={new Date()} />
    </>
  );
}

export default MessageList;

