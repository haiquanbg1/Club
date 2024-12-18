import FriendApiRequest from "@/apiRequest/friend";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
interface Friend {
  user_id: string;
  friend_id: string;
  display_name: string;
  avatar: string;
}
export default function ListFriend() {
  const [listFriend, setListFriend] = useState<Friend[]>([]);
  const [search, setSearch] = useState("");
  const friend = useSelector((state: RootState) => state.friend.friend);
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
    console.log(1)
    getFriend();
  }, [friend]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      getFriend();
    }, 1000);

    // Xóa timeout nếu search thay đổi trước khi kết thúc 3 giây
    return () => clearTimeout(delayDebounceFn);
  }, [search]);
  return (
    <div className=" bg-[#2b2d31] flex-1 overflow-auto p-2">
      <h3 className="text-center text-[24px] mt-1 font-bold mb-4 ">Bạn bè</h3>
      <Input
        className="mb-2 bg-transparent focus-visible:ring-0 focus:outline-none focus:ring-none border-[white] ring-offset-0"
        placeholder="Nhập tên bạn bè"
        onChange={(e) => setSearch(e.target.value)}
      />
      {listFriend.map((friend, index) => (
        <div
          className="flex items-center rounded-lg mb-4 cursor-pointer hover:bg-[#3d3f46] p-1"
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
