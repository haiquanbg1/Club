import { useEffect, useState } from 'react'
// import { useToast } from '@/hooks/use-toast'
import ClubApiRequest from '@/apiRequest/club';
import { useParams } from 'react-router-dom';
import { Pencil } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
interface Club {
    name: string;
    id: string;
    avatar: string;
}
export default function ProfileCard() {
    const [club, setClub] = useState<Club>()
    const [edit, setEdit] = useState(false)
    const [open, setOpen] = useState(false)
    const [openDialog, setOpenDialog] = useState(false)

    const { id } = useParams()
    useEffect(() => {
        // Hàm fetch dữ liệu từ API
        const fetchData = async () => {
            try {
                const response = await ClubApiRequest.getClub(id || "")
                console.log(response)
                setClub(response.payload.data[0]);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();  // Gọi hàm fetch khi component render lần đầu
    }, []);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };
    // const { toast } = useToast()
    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('avatar', selectedFile ? selectedFile : "");
        formData.append('club_id', id ? id : "");

        formData.forEach((value, key) => {
            console.log(key, value);  // In ra từng key và value trong FormData
        });
        try {
            const res = await ClubApiRequest.changeAvatar(formData)
            // localStorage.setItem("avatar", res.payload.data.avatar)
            console.log(res)
            setSelectedFile(null)
            setOpenDialog(false)
        } catch (error: any) {
            console.error('Error uploading image:', error.payload);
        }
    };
    return (
        <>
            <div className='rounded-md w-full overflow-hidden bg-[#3f3f3f]'>
                <div className='min-h-[100px] bg-[#ECDFCC] flex'>
                </div>
                <div className='flex justify-between h-[60px]'>
                    <div className='flex'>

                        <div onClick={() => setOpen(!open)} className=' translate-y-[-40px] translate-x-5 rounded-full bottom-[-40px] left-[20px] border-[8px] border-[#3f3f3f] bg-red-50 w-[100px] h-[100px]'>
                            <img className='w-full h-full object-cover rounded-full' src={club?.avatar}></img>
                        </div>
                        <DropdownMenu open={open} onOpenChange={setOpen}>
                            <DropdownMenuTrigger>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem>
                                    <div className="text-red-600" onClick={() => setOpenDialog(!openDialog)}>Thay đổi ảnh đại diện</div>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                            <DialogTrigger></DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Thay đổi ảnh đại diện</DialogTitle>
                                    <DialogDescription>

                                    </DialogDescription>
                                </DialogHeader>
                                <Input type='file' onChange={handleFileChange}></Input>
                                <DialogFooter>
                                    <Button variant="accept" onClick={handleUpload}>Xác nhận</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                        <div className='translate-x-5 translate-y-[10px]'>
                            <div className='text-[18px]'>Câu lạc bộ {club?.name}</div>
                        </div>
                    </div>

                </div>
                <div className='p-[10px]'>
                    <div className=' dark:bg-[#121212] min-h-[40px] rounded-[10px] p-[10px]'>
                        <div className='space-y-5 mb-[20px]'>
                            <div>
                                <div className='text-[22px] font-bold flex items-center space-x-3 text-[#ccc]'>
                                    <p>Mô tả về câu lạc bộ</p>
                                    <div className='hover:bg-gray-700 rounded-full p-2' onClick={() => setEdit(!edit)} >
                                        <Pencil size={20} />
                                    </div>
                                </div>
                            </div>
                            <div>
                                {
                                    !edit && (
                                        <div className='text-[14px]'>Đây là câu lạc bộ thử nghiệm của chúng tôi</div>
                                    )
                                }
                                {
                                    edit && (
                                        <div className='text-[14px]'>
                                            <textarea defaultValue={"Đây là câu lạc bộ thử nghiệm của chúng tôi"} className='resize-none bg-slate-700 p-2 rounded-sm outline-none w-full'></textarea>
                                            <div className='flex '>
                                                <div className='ml-auto space-x-4 text-[18px]'>
                                                    <button className='p-1 rounded-lg bg-red-500'>Hủy</button>
                                                    <button className='p-1 rounded-lg bg-green-500'>Xác nhận</button>
                                                </div>
                                            </div>
                                        </div>

                                    )
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
