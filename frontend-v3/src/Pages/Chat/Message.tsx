import moment from "moment";
import React from 'react';
import Avatar from './Avatar';
import { FaSmile } from 'react-icons/fa';
import { TiDelete } from "react-icons/ti";
import { UserChat } from ".";

type Props = {
    orientation: "left" | "right";
    author: UserChat;
    content: ContentProps;
};

type ContentProps = {
    id: string;
    message: string;
    sender_id: string;
    created_at: Date;
}


// const isOneDayBefore = (date: Date) => {
//     return moment(date).isBefore(moment().subtract(1, "days"));
// };

export default function Message({
    orientation,
    author,
    content
}: Props) {
    const formatDate = (date: Date) => {
        // if (isOneDayBefore(date)) {
        //     return moment(date).format("L");
        // }

        return moment(date).format("MMMM D, YYYY, HH:mm");
    };

    const handleDeleteMessage = () => {
    };

    return (
        <div className={`flex w-full ${orientation === "right" ? "justify-end" : "justify-start"} group relative`}>
            <div className={`flex w-fit max-w-[75%] items-end py-[5px] ${orientation === "right" ? "flex-row-reverse" : "flex-row"} `}>
                <Avatar
                    className={orientation === "right" ? "ml-[10px]" : "mr-[10px]"}
                    size="md"
                    name={author.display_name}
                    imgSrc={author.avatar}
                />

                <div className={`flex-1 rounded-2xl px-[10px] py-[6px] ${orientation === "right" ? "bg-red-500" : "bg-green-400"} shadow-md max-w-[75%] relative`}
                    style={{ wordWrap: "break-word", wordBreak: "break-word", whiteSpace: "pre-wrap" }}>
                    <div
                        className={`flex items-end text-sm font-semibold ${orientation === "right"
                            ? "flex-row-reverse text-right"
                            : "flex-row text-left"
                            }`}
                    >

                    </div>
                    <div
                        className={`${orientation === "right" ? "justify-end" : "justify-start"
                            } flex w-full text-base leading-tight light:text-black dark:text-white`}
                    >
                        {content.message.split("/n").map((line, i) => (
                            <React.Fragment key={i}>
                                {line}
                                <br />
                            </React.Fragment>
                        ))}
                    </div>

                    {/* Hover Action */}
                    <div className={`absolute top-full ${orientation === "right" ? "right-full" : "left-full"} hidden group-hover:flex items-center gap-2 bg-none p-1 text-white text-xs rounded shadow-lg`}
                        style={orientation === "right" ? { transform: "translateY(-100%) translateX(-10%)" } : { transform: "translateY(-100%) translateX(10%)" }}
                    >
                        <button className="px-1 py-1 bg-blue-500 rounded-3xl hover:bg-blue-600">
                            <FaSmile size={18} />
                        </button>
                        <button className="px-1 py-1 bg-red-500 rounded-3xl hover:bg-red-600 justify-center">
                            <TiDelete size={18} />
                        </button>

                    </div>
                    {/* Hover Time */}
                    <div className={`absolute w-max top-full ${orientation === "right" ? "left-0" : "right-0"} hidden group-hover:flex items-center gap-2 bg-gray-700 text-white text-xs p-1 rounded shadow-lg`}
                        style={orientation === "right" ? { transform: "translateY(-100%) translateX(-150%)" } : { transform: "translateY(-100%) translateX(150%)" }}
                    >
                        <span>{formatDate(content.created_at)}</span>
                    </div>
                </div>

            </div>

        </div>
    );
}