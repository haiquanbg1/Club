import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { ReactType } from '.';
import { useEffect } from 'react';
import ReactItem from './ReactItem';

type Props = {
  openState: boolean;
  setOpenState: (openState: boolean) => void;
  handleDeleteCancel: () => void;
  message_id: string;
  socketRef: React.RefObject<any>;
  setReactListStated: (reacts: ReactType[] | ((reacts: ReactType[]) => ReactType[])) => void;
  reactListStated: ReactType[];
};

const ListReact = ({
  openState,
  setOpenState,
  handleDeleteCancel,
  message_id,
  socketRef,
  setReactListStated,
  reactListStated,
}: Props) => {

  

  const processReact = (reactObj: ReactType) => {
    if (reactObj.message_id === message_id) {
      // kiểm tra nếu đã tồn tại reactObj này trong reactList thì sẽ xóa nó đi
      setReactListStated((prevReactList) => {
        const existReact = prevReactList.find(
            react => react.user_id === reactObj.user_id && react.message_id === message_id
        );
        console.log('reactList 1:', prevReactList);
        console.log('reactObj:', reactObj);
        if (existReact) {
            console.log('existReact 2:', existReact);
            if (existReact.react === reactObj.react) {
                // Xóa react nếu giống nhau
                console.log('remove 1 lan')
                return prevReactList.filter(
                    react => !(react.user_id === reactObj.user_id && react.react === reactObj.react)
                );
                
            } else {
                // Thay thế react
                console.log('update 1 lan')
                return prevReactList.map(react => 
                    react.user_id === reactObj.user_id && react.message_id === message_id
                        ? { ...reactObj } 
                        : react
                );
            }
        } else {
            // Thêm mới react
            console.log('add 1 lan')
            return [...prevReactList, { ...reactObj }];
        }
    });

    }
  };

  

  useEffect(() => {

    if (socketRef.current) {
      socketRef.current.on('receive-react-list', processReact);
    }
    return () => {
      if (socketRef.current) {
        socketRef.current.off('receive-react-list');
      }
    };
  }, [socketRef.current]);

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
              <ReactItem
                key={react.id}
                reactItemChild={react}
                socketRef={socketRef}
              />
            ))}
          </div>
          <div className="flex gap-4 justify-center w-full mt-6">
            <AlertDialog.Cancel asChild>
              <button
                className="px-4 py-2 bg-gray-500 rounded-lg hover:bg-gray-700 text-sm font-semibold w-full"
                onClick={handleDeleteCancel}
              >
                Exit
              </button>
            </AlertDialog.Cancel>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

export default ListReact;
