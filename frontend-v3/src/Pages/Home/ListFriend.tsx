import FriendApiRequest from "@/apiRequest/friend";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

interface Friend {
  user_id: string;
  friend_id: string;
  display_name: string;
  avatar: string;
}
export default function ListFriend() {
  const [listFriend, setListFriend] = useState<Friend[]>([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleClick = (friend_id: string) => {
    navigate(`/friend/${friend_id}/chat`);
  };

  const getFriend = async () => {
    try {
      const response = await FriendApiRequest.getFriend(search);
      // Giả sử API trả về mảng các object có cấu trúc tương tự Item
      setListFriend(response.payload.data);
    } catch (error) { }
  };
  useEffect(() => {
    getFriend();
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        getFriend();
      }
    }, 1000);

    // Xóa timeout nếu search thay đổi trước khi kết thúc 3 giây
    return () => clearTimeout(delayDebounceFn);
  }, [search]);
  return (
    <div className=" bg-[#2b2d31] flex-1 overflow-auto p-2">
      <h3 className="text-center text-[20px] mb-3">Bạn bè</h3>
      <Input
        className="mb-2 bg-transparent focus-visible:ring-0 focus:outline-none focus:ring-none border-[white] ring-offset-0"
        placeholder="Nhập tên bạn bè"
        onChange={(e) => setSearch(e.target.value)}
      />
      {listFriend.map((friend, index) => (
        <div
          className="flex items-center mb-4 cursor-pointer hover:bg-slate-400 p-1"
          key={index}
          onClick={() => handleClick(friend.friend_id)}
        >
          <Avatar className="mr-4">
            <AvatarImage src={friend.avatar} />
          </Avatar>
          <p className="text-[16px]">{friend.display_name}</p>
        </div>
      ))}
    </div>
  );
}
