import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import ReportApiRequest from "@/apiRequest/report";
import { useToast } from '@/hooks/use-toast'

export default function ReportPage() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const handleTitleChange = (e: any) => {
        setTitle(e.target.value);
    };
    const { toast } = useToast()


    // Hàm xử lý thay đổi giá trị textarea
    const handleContentChange = (e: any) => {
        setContent(e.target.value);
    };
    console.log(title)
    console.log(content)
    const navigate = useNavigate()
    const { clubId } = useParams()

    const handleSubmit = async () => {
        try {
            const body = {
                title,
                message: content,
                club_id: clubId || ""
            }
            const res = await ReportApiRequest.create(body)
            toast({
                description: res?.payload.message
                // description: "There was a problem with your request.",
            })
            setContent("")
            setTitle("")
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="bg-[#A0A0A0] h-screen flex flex-col">
            <div className="w-full  bg-[#434242] p-2 flex justify-between items-center">
                <h1 className="font-bold text-2xl">Báo cáo</h1>
                <ArrowLeft className="rounded-full hover:bg-[#434343] cursor-pointer" size={30} onClick={() => navigate(/club/${clubId})}></ArrowLeft>
            </div>
            <div className=" lg:pl-[200px] flex-1  lg:pr-[200px] xl:pl-[300px] xl:pr-[300px] 2xl:pl-[400px] 2xl:pr-[400px] ">
                <div className="bg-[#040404] h-full flex flex-col overflow-auto p-4 space-y-4">
                    <Input
                        className="w-1/2 text-[#4e4e4e] placeholder:text-[#4e4e4e] text-[20px] bg-[#cfcfcfe5] "
                        placeholder="Nhập tiêu đề"
                        value={title} // Bind the value of state to the input field
                        onChange={handleTitleChange}
                    />
                    <textarea
                        className="flex-1 resize-none outline-none p-2 rounded-sm w-full bg-[#cfcfcfe5] text-[#4e4e4e] placeholder:text-[#4e4e4e] h-[80%] text-[20px]"
                        placeholder="Nhập nội dung"
                        value={content} // Bind the value of state to the textarea
                        onChange={handleContentChange}
                    />
                    <div className="flex">
                        <Button className="ml-auto" onClick={handleSubmit}>Gửi báo cáo</Button>
                    </div>
                </div>
            </div>
        </div>

    )
}
