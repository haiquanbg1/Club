import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
const testName = ["Khánh", "Quân", "Doanh", "Hiếu", "Thắng"]

export default function ListFriend() {
    const [listFriend, setListFriend] = useState([])
    return (
        <div className="w-[300px] bg-gray-700 overflow-auto p-2">
            <h3 className="text-center text-[20px] mb-3">Bạn bè</h3>
            <Input className="mb-2 bg-transparent focus-visible:ring-0 focus:outline-none focus:ring-none border-[white] ring-offset-0" placeholder="Nhập tên bạn bè" />
            {testName.map((namee, index) => (
                <div className="flex items-center mb-4 cursor-pointer hover:bg-slate-400" key={index}>
                    <Avatar className="mr-4">
                        <AvatarImage src="https://github.com/shadcn.png" />
                    </Avatar>
                    <p className="text-[16px]">{namee}</p>
                </div>
            ))}
        </div>
    )
}
