import userApiRequest from "@/apiRequest/userProfile"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
// import { useToast } from "@/hooks/use-toast"
import { useState } from "react"


export default function ChangeAvatar() {
    const [open, setOpen] = useState(false)
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };
    // const { toast } = useToast()
    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('image', selectedFile ? selectedFile : "");
        // formData.forEach((value, key) => {
        //     console.log(key, value);  // In ra từng key và value trong FormData
        // });
        try {
            // const res = await userApiRequest.changeAvatar(formData)
            // const res = await fetch('http://localhost:8080/api/v1/user/changeAvatar', {
            //     credentials: 'include',
            //     method: 'PATCH',
            //     body: formData, // FormData sẽ được gửi đúng định dạng
            // });
            const res = await userApiRequest.changeAvatar(formData)
            localStorage.setItem("avatar", res.payload.data.avatar)
            console.log(res)
            setOpen(false)
        } catch (error: any) {
            console.error('Error uploading image:', error.payload);
        }
    };
    return (
        <div className='w-full'>
            <h3 className='text-[20px] mb-[10px]'>Ảnh đại diện</h3>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant={"blue"} className="text-[14px] p-[5px] bg-[#4F75FF]">Đổi ảnh đại diện </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit profile</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <div>
                        <input type="file" onChange={handleFileChange} />
                        <button onClick={handleUpload}>Upload</button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
