import moment from "moment";
import React, { useState, useEffect } from "react";
import Avatar from "../Chat/Avatar";
import { FaSmile } from "react-icons/fa";
// import { TiDelete } from "react-icons/ti";
import { UserChat } from "../Chat";
import EmojiPicker from "../Chat/EmojiPicker";
import AlertDeleteMyMes from "../Chat/AlertDeleteMyMes";
import AlertDeleteOtherMes from "../Chat/AlertDeleteOtherMes";
import axios from "axios";
import { MessageStatus, Profile } from "../Chat/index";
import { ReactType } from ".";
import ListReact from "./ListReact";
import { v4 } from "uuid";

type Props = {
  orientation: "left" | "right";
  author: UserChat;
  content: ContentProps;
  socketRef: React.RefObject<any>;
  userId: string;
  userProfile: Profile;
  conversationId: string;
};

type ContentProps = {
  id: string;
  react: ReactType[];
  message: string;
  status: MessageStatus;
  sender_id: string;
  created_at: Date;
};

export default function Message({
  orientation,
  author,
  content,
  socketRef,
  userId,
  userProfile,
  conversationId,
}: Props) {
  const formatDate = (date: Date) => {
    return moment(date).format("MMMM D, YYYY, HH:mm");
  };

  const [reactList, setReactList] = useState<ReactType[]>(content.react);

  const [react, setReact] = useState("");

  const [reactListStated, setReactListStated] = useState<ReactType[]>([]);

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const emojiPickerRef = React.useRef<HTMLDivElement>(null);

  const emojiPickerButtonRef = React.useRef<HTMLButtonElement>(null);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const [isReactDialogOpen, setIsReactDialogOpen] = useState(false);

  const handleClickOutside = (e: MouseEvent) => {
    if (
      emojiPickerRef.current &&
      emojiPickerButtonRef.current &&
      !emojiPickerRef.current.contains(e.target as Node) &&
      !emojiPickerButtonRef.current.contains(e.target as Node)
    ) {
      setShowEmojiPicker(false);
    }
  };

  const addEmoji = (emoji: string) => {
    console.log("emoji:", emoji);
    const reactObject: ReactType = {
      react: emoji,
      user_id: userProfile.id,
      message_id: content.id,
      id: v4(),
      sender: {
        avatar: userProfile.avatar,
        display_name: userProfile.display_name,
      },
    };
    setShowEmojiPicker(false);
    if (socketRef.current) {
      socketRef.current.emit("receive-react", reactObject);
      socketRef.current.emit("receive-react-list", reactObject);
      socketRef.current.emit('react-item', reactObject);
    }
    createReact(reactObject);
  };

  const handleDeleteForMyMessage = async () => {
    socketRef.current.emit("delete-my-message", content.id);
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/v1/api/v1/message/delete`,
        {
          data: {
            message_id: content.id,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        console.log("Delete message success");
      } else {
        console.error("Delete message failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteForOtherMessage = async () => {
    socketRef.current.emit("delete-other-message", {
      messageId: content.id,
      userId: userId,
    });
    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/api/v1/message/deleteOtherMessage`,
        {
          message_id: content.id,
          user_id: userId,
          conversation_id: conversationId,
        },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        console.log("delete success");
      } else {
        console.error("delete failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const confirmDeleteForMyMessage = () => {
    handleDeleteForMyMessage();
    setIsDeleteDialogOpen(false);
  };

  const confirmDeleteForOtherMessage = () => {
    handleDeleteForOtherMessage();
    setIsDeleteDialogOpen(false);
  };

  const cancelDelete = () => {
    setIsDeleteDialogOpen(false);
  };

  const leaveReact = () => {
    setIsReactDialogOpen(false);
  };

  // check xem thằng này có react chưa nếu chưa thì sẽ thêm react nó vào
  // nếu rồi thì sao
  // nếu chưa thì sao

  const createReact = async (reactObj: ReactType) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/api/v1/message/createReact`,
        {
          message_id: reactObj.message_id,
          react: reactObj.react,
          user_id: reactObj.user_id,
          id: v4(),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        console.log("change avatar success");
      } else {
        console.error("change avatar failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // fetch lần đầu
  useEffect(() => {
    const fetchReactList = async () => {
      try {
        axios
          .get(
            "http://localhost:8080/api/v1/api/v1/message/react",
            {
              params: {
                message_id: content.id,
              },
              withCredentials: true,
            }
          )
          .then((res) => {
            setReactListStated(res.data.data);
          });
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchReactList();
  }, [reactList]);

  // const handleReceiveReactList = (reactObj: ReactType) => {
  //     // if (isDataLoaded) {
  //     //   setReactQueue((prevReactQueue) => [...prevReactQueue, reactObj]);
  //     // } else {
  //       processReact(reactObj);
  //     // }
  //   };

  // bđ v chứng tỏ reactList là đúng còn quả fetch kia thì sai
  useEffect(() => {
    const firstReact = reactList.find((_, index) => index === 0);
    setReact(firstReact ? firstReact.react : "");
  }, [reactList]);

  // bắt sự kiện click ra ngoài để ẩn emoji picker
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // nhận sự kiện từ socket
  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on("receive-react", (reactObj: ReactType) => {
        if (reactObj.message_id === content.id) {
          setReactList((prevReactList) => {
            const existReact = prevReactList.find(
              (react) =>
                react.user_id === reactObj.user_id &&
                react.message_id === content.id
            );
            console.log("reactList 1:", prevReactList);
            console.log("reactObj:", reactObj);
            if (existReact) {
              console.log("existReact 2:", existReact);
              if (existReact.react === reactObj.react) {
                // Xóa react nếu giống nhau
                console.log("remove 1 lan");
                return prevReactList.filter(
                  (react) =>
                    !(
                      react.user_id === reactObj.user_id &&
                      react.react === reactObj.react
                    )
                );
              } else {
                // Thay thế react
                console.log("update 1 lan");
                return prevReactList.map((react) =>
                  react.user_id === reactObj.user_id &&
                    react.message_id === content.id
                    ? { ...reactObj }
                    : react
                );
              }
            } else {
              // Thêm mới react
              console.log("add 1 lan");
              return [...prevReactList, { ...reactObj }];
            }
          });
        }
      });

      // socketRef.current.on('receive-react-list', (reactObj: ReactType) => {
      //     // kiểm tra reactObj có phải là tin nhắn này ko
      //     if (reactObj.message_id === content.id) {
      //         // kiểm tra nếu đã tồn tại reactObj này trong reactList thì sẽ xóa nó đi
      //         const existReact = reactListStated.find(react => (react.user_id === reactObj.user_id));
      //         // console.log('existReact', existReact);
      //         if (existReact) {
      //             if (existReact.react === reactObj.react) {
      //                 setReactListStated((prevReactList) => {
      //                     return prevReactList.filter(react => !(react.user_id === reactObj.user_id && react.react === reactObj.react));
      //                 });
      //                 // console.log('remove 1 lan')
      //             } else {
      //                 setReactListStated((prevReactList) => {
      //                     const tempList = prevReactList.filter(react => !(react.user_id === reactObj.user_id));
      //                     // console.log('update 1 lan')
      //                     return [...tempList, reactObj];
      //                 });
      //             }
      //         } else {
      //             setReactListStated((prevReactList) => {
      //                 return [...prevReactList, reactObj];
      //             });
      //             // console.log('add 1 lan')
      //         }

      //     }

      // });
    }
  }, [socketRef.current, socketRef]);

  return (
    <div
      className={`flex w-full ${orientation === "right" ? "justify-end" : "justify-start"
        } group relative mt-2 mb-2`}
    >
      <div
        className={`flex w-fit max-w-[75%] items-end py-[5px] ${orientation === "right" ? "flex-row-reverse" : "flex-row"
          } `}
      >
        <Avatar
          className={orientation === "right" ? "ml-[10px]" : "mr-[10px]"}
          size="md"
          name={author.display_name}
          imgSrc={author.avatar}
          orientation={orientation}
        />

        <div
          className={`flex-1 rounded-2xl px-[10px] py-[6px] ${orientation === "right" ? "bg-red-500" : "bg-green-400"
            } shadow-md max-w-[75%] relative`}
          style={{
            wordWrap: "break-word",
            wordBreak: "break-word",
            whiteSpace: "pre-wrap",
          }}
        >
          <div
            className={`flex items-end text-sm font-semibold ${orientation === "right"
              ? "flex-row-reverse text-right"
              : "flex-row text-left"
              }`}
          ></div>
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
          <div
            className={`absolute top-full ${orientation === "right" ? "right-full" : "left-full"
              } hidden group-hover:flex items-center gap-2 bg-none p-1 text-white text-xs rounded shadow-lg`}
            style={
              orientation === "right"
                ? { transform: "translateY(-100%) translateX(-10%)" }
                : { transform: "translateY(-100%) translateX(10%)" }
            }
          >
            {userId !== content.sender_id ? (
              <>
                <button
                  className="px-1 py-1 bg-slate-400 rounded-3xl hover:bg-blue-600"
                  type="button"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  ref={emojiPickerButtonRef}
                >
                  <FaSmile size={18} />
                </button>
                <AlertDeleteOtherMes
                  openState={isDeleteDialogOpen}
                  setOpenState={setIsDeleteDialogOpen}
                  handleDeleteConfirm={confirmDeleteForOtherMessage}
                  handleDeleteCancel={cancelDelete}
                />
              </>
            ) : (
              <AlertDeleteMyMes
                openState={isDeleteDialogOpen}
                setOpenState={setIsDeleteDialogOpen}
                handleDeleteConfirm={confirmDeleteForMyMessage}
                handleDeleteCancel={cancelDelete}
              />
            )}

            {/* <button className="px-1 py-1 bg-slate-400 rounded-3xl hover:bg-yellow-600 justify-center"
                            onClick={removeEmoji}>
                            <MdReply size={18} />
                        </button> */}
          </div>
          {/* Hover Time */}
          <div
            className={`absolute w-max top-full ${orientation === "right" ? "left-0" : "right-0"
              } hidden group-hover:flex items-center gap-2 bg-gray-700 text-white text-xs p-1 rounded shadow-lg`}
            style={
              orientation === "right"
                ? { transform: "translateY(-100%) translateX(-180%)" }
                : { transform: "translateY(-100%) translateX(180%)" }
            }
          >
            <span>{formatDate(content.created_at)}</span>
          </div>
          {showEmojiPicker && (
            <div
              ref={emojiPickerRef}
              className={`absolute bottom-full ${orientation === "right" ? "left-0" : "right-0"
                }`}
              style={
                orientation === "right"
                  ? { transform: "translateY(20%) translateX(-50%)" }
                  : { transform: "translateY(20%) translateX(50%)" }
              }
            >
              <EmojiPicker onSelectEmoji={addEmoji} />
            </div>
          )}

          {react !== "" && (
            <>
              <button
                onClick={() => setIsReactDialogOpen(true)}
                className={`absolute bottom-0 right-0 bg-slate-300 border rounded-md`}
                style={{ transform: "translateY(60%)" }}
              >
                <span className="">{react}</span>
              </button>

              <ListReact
                socketRef={socketRef}
                message_id={content.id}
                openState={isReactDialogOpen}
                setOpenState={setIsReactDialogOpen}
                handleDeleteCancel={leaveReact}
                reactListStated={reactListStated}
                setReactListStated={setReactListStated}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
