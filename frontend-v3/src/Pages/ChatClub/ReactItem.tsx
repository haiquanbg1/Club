import socket from '@/socket';
import { useEffect, useState } from 'react';
import { ReactType } from '.';

type Props = {
    reactItemChild: ReactType;
    socketRef: React.RefObject<any>;
}

const reactItem = ({ reactItemChild, socketRef }: Props) => {

    const [reactItemState, setReactItemState] = useState(reactItemChild.react);

    // thằng này lắng nghe sự kiện thay đổi của react con
    useEffect(() => {
        if (socketRef.current) {
            socketRef.current.on('react-message', (reactObj: ReactType) => {
                if (reactObj.message_id === reactItemChild.message_id && reactObj.user_id === reactItemChild.user_id) {
                    setReactItemState(reactObj.react);
                }
            });
        }

    }, [socketRef.current]);

    return (
        <div key={reactItemChild.id} className="flex items-center gap-4 relative">
            <div className="flex items-center gap-2">
                <img
                    src={reactItemChild.sender.avatar}
                    alt="avatar"
                    className="w-8 h-8 rounded-full"
                />
                <span className="text-sm font-semibold">{reactItemChild.sender.display_name}</span>
                <span className="text-lg absolute right-0">{reactItemState}</span>
            </div>
        </div>
    )
}

export default reactItem;