import ChatInfo from "./ChatInfo";

type Props = {
    author: string;
    id: string;
};

export default function Header({
    author,
    id
}: Props) {
    return (
        <div className="">
            <ChatInfo />
            <div>
                <span className="mt-8 mb-8 text-4xl font-mono"> {author} </span>
            </div>
            <div>
                <span className="mt-8 mb-8 font-sans text-medium"> {id} </span>
            </div>
            <div>
                <span className="mt-8 mb-8 text-amin">Đây là phần mở đầu trong lịch sử các tin nhắn trực tiếp của bạn với: {author} </span>
            </div>
        </div>
    )
}