import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { Button } from '../../components/ui/button';
import { ReactType } from '.';
import { useEffect, useState } from 'react';
import { set } from 'date-fns';
import axios from 'axios';

type Props = {
  openState: boolean;
  setOpenState: (openState: boolean) => void;
  handleDeleteCancel: () => void;
  reactList: ReactType[];
  message_id: string;
  socketRef: React.RefObject<any>;
};

const ListReact = ({
  openState,
  setOpenState,
  handleDeleteCancel,
  reactList,
  message_id,
  socketRef
}: Props) => {

  const [reactListStated, setReactListStated] = useState<ReactType[]>([]);

  useEffect(() => {
    // console.log('reactList', reactList);
    const fetchReactList = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/message/react`, {
          params: {
            message_id
          },
          withCredentials: true
        });
        // console.log('response', response);
        setReactListStated(response.data.data);
      } catch (error) {
        console.log('error', error);
      }
    }
    fetchReactList();

  }, [reactList]);

  useEffect(() => {
    socketRef.current.on('receive-react', (reactObj: ReactType) => {
      if (reactObj.message_id === message_id) {
        const react = reactListStated.find((react) => react.user_id === reactObj.user_id);
        if (react?.react == reactObj.react) {
          // loc di nhung tin nhắn lặp lại kể cả với bất kỳ ai
          setReactListStated((prevReactList) => prevReactList.filter((react) => react.user_id !== reactObj.user_id));
        } else {
          // bỏ tin nhắn cũ thay bằng tin mới
          const tempReact = reactListStated.filter((react) => react.user_id !== reactObj.user_id)
          setReactListStated([...tempReact, reactObj]);
          // console.log('list', reactList);
        }

      }
    });
  }, [socketRef, socketRef.current]);

  return (
    <AlertDialog.Root open={openState} onOpenChange={setOpenState}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 z-50" />
        <AlertDialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-600 p-6 rounded-lg shadow-lg w-96 z-50">
          <AlertDialog.Title className="text-xl font-semibold text-gray-900">
            Cảm xúc về tin nhắn
          </AlertDialog.Title>
          <AlertDialog.Description className="text-sm mb-6 text-white">

          </AlertDialog.Description>
          <div className="flex flex-col gap-4 mt-4">
            {reactListStated.map((react) => (
              <div key={react.id} className="flex items-center gap-4 relative">
                <div className="flex items-center gap-2">
                  <img
                    src={react.sender.avatar}
                    alt="avatar"
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-sm font-semibold">{react.sender.display_name}</span>
                  <span className="text-lg absolute right-0">{react.react}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-4 justify-center w-full mt-6">
            <AlertDialog.Cancel asChild>
              <button
                className="px-4 py-2 bg-gray-500 rounded-lg hover:bg-gray-700 text-sm font-semibold w-full"
                onClick={handleDeleteCancel}
              >
                Cancel
              </button>
            </AlertDialog.Cancel>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

export default ListReact;
