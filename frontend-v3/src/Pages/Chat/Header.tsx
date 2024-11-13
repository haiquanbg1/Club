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
        <div className="p-3 flex align-middle border-b border-gray-300">
            <ChatInfo author={author} id={id} />
            <div className="icons">
                
            </div>
        </div>
    )
}