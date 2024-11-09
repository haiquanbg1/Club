import moment from "moment";
import React from 'react';
import Avatar from './Avatar';

type Props = {
    orientation: "left" | "right";
    author: author;
    content: string;
    createdAt: Date;
};

type author = {
    name: string;
    imgSrc: string;
}

const isOneDayBefore = (date: Date) => {
    return moment(date).isBefore(moment().subtract(1, "days"));
};

export default function Message({
    orientation,
    author,
    content,
    createdAt
}: Props) {
    const formatDate = (date: Date) => {
        if (isOneDayBefore(date)) {
            return moment(date).format("L");
        }

        return moment(date).format("MMMM D, YYYY, HH:mm");
    };

    return (
        <div
            className={`flex w-full ${orientation === "right" ? "justify-end" : "justify-start"
                }`}
        >
            <div
                className={`flex w-fit max-w-[75%] items-end py-[5px] ${orientation === "right" ? "flex-row-reverse" : "flex-row"
                    }`}
            >
                {/* Avatar (nếu cần sử dụng lại sau này) */}
                <Avatar
                    className={orientation === "right" ? "ml-[10px]" : "mr-[10px]"}
                    size="md"
                    name="Thang"
                    imgSrc={author.imgSrc}
                />

                <div className={`flex-1 rounded-[10px]  px-[10px] py-[6px] ${orientation === "right" ? "text-white" : "text-white"} shadow-md`}>
                    <div
                        className={`flex items-end text-sm font-semibold ${orientation === "right"
                            ? "flex-row-reverse text-right"
                            : "flex-row text-left"
                            }`}
                    >
                        <span>{author.name}</span>
                        <span
                            className={`${orientation === "right" ? "mr-3" : "ml-3"
                                } text-min dark:text-white`}
                            title={moment(createdAt).format("LLLL")}
                        >
                            {formatDate(createdAt)}
                        </span>
                    </div>
                    <div
                        className={`${orientation === "right" ? "justify-end" : "justify-start"
                            } flex w-full text-base leading-tight light:text-black dark:text-white`}
                    >
                        {content.split("/n").map((line, i) => (
                            <React.Fragment key={i}>
                                {line}
                                <br />
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}