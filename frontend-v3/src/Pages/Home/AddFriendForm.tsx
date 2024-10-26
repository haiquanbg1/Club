import FriendApiRequest from '@/apiRequest/friend';
import { Button } from '@/components/ui/button'
import { useState } from 'react'
export default function AddFriendForm() {
    const [id, setId] = useState("")
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setId(event.target.value); // Cập nhật state với giá trị mới
    };

    const handleSubmit = async () => {
        try {
            const res = await FriendApiRequest.add({ user_id: id })
            console.log(res)
            setId("")
        } catch (error: any) {
            console.log(error.payload)
        }
    }
    return (
        <div>
            <h2 className="text-[30px]">Thêm bạn</h2>
            <p className="text-[20px]">Bạn có thể thêm bạn bằng id của họ</p>
            <div className=" flex 2xl:w-1/2 w-full bg-gray-600 p-2">
                <input className="flex h-10 w-full rounded-md bg-transparent mr-2 border-none outline-none" placeholder="Nhập id người dùng" onChange={handleInputChange} ></input>
                <Button onClick={handleSubmit} disabled={id === ""}>Thêm bạn</Button>
            </div>
        </div>

    )
}
