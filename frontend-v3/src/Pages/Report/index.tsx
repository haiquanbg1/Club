import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
export default function ReportPage() {
    const navigate = useNavigate()
    return (
        <div className="bg-[#A0A0A0] h-screen">
            <div className="w-full  bg-[#434242] p-2 flex justify-between items-center">
                <h1 className="font-bold text-2xl">Báo cáo</h1>
                <ArrowLeft className="rounded-full hover:bg-[#434343] cursor-pointer" size={30} onClick={() => navigate("/")}></ArrowLeft>
            </div>
            <div className=" lg:pl-[200px] h-[95%] lg:pr-[200px] xl:pl-[300px] xl:pr-[300px] 2xl:pl-[400px] 2xl:pr-[400px] ">
                <div className="bg-[#040404] h-full overflow-auto p-4 space-y-4">
                    <Input className="w-1/2 text-[#4e4e4e] placeholder:text-[#4e4e4e] text-[20px] bg-[#cfcfcfe5] " placeholder="Nhập tiêu đề" ></Input>
                    <textarea className="resize-none outline-none p-2 rounded-sm w-full bg-[#cfcfcfe5] text-[#4e4e4e] placeholder:text-[#4e4e4e] h-[80%] text-[20px]" placeholder="Nhập nội dung">

                    </textarea>
                    <div className="flex">
                        <Button className="ml-auto">Gửi báo cáo</Button>
                    </div>
                </div>
            </div>
        </div>

    )
}
