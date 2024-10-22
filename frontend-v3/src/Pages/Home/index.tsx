import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

const testName = ["Khánh", "Quân", "Doanh", "Hiếu", "Thắng"]
export default function Home() {
    return (
        <div className="w-full h-screen overflow-auto">
            <div>Home page</div>
            <div className="flex h-full">
                <div className="w-[300px] bg-gray-700 ">
                    <h3 className="text-center text-[20px] mb-3">Bạn bè</h3>
                    {testName.map((namee, index) => (
                        <div className="flex items-center mb-4 cursor-pointer hover:bg-slate-400" key={index}>
                            <Avatar className="mr-4">
                                <AvatarImage src="https://github.com/shadcn.png" />
                            </Avatar>
                            <p className="text-[16px]">{namee}</p>
                        </div>
                    ))}
                </div>
                <div className="bg-[#A0A0A0] w-full p-4">
                    <h2 className="text-[30px]">Thêm bạn</h2>
                    <p className="text-[20px]">Bạn có thể thêm bạn bằng id của họ</p>
                    <div className=" flex 2xl:w-1/2 w-full bg-gray-600 p-2">
                        <input className="flex h-10 w-full rounded-md bg-transparent mr-2 border-none outline-none" placeholder="Nhập id người dùng"></input>
                        <Button>Thêm bạn</Button>
                    </div>
                </div>
            </div>

        </div>

    )
}
