import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import AddFriendForm from "./AddFriendForm"

const testName = ["Khánh", "Quân", "Doanh", "Hiếu", "Thắng"]
export default function Home() {
    return (
        <div className="w-full h-screen max-h-screen overflow-auto">
            {/* <div>Home page</div> */}
            <div className="flex flex-1 h-full">
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

                    <AddFriendForm />
                </div>
            </div>

        </div>

    )
}
