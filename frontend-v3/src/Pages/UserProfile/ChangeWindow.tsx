import { useState } from 'react';
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import userApiRequest from '@/apiRequest/userProfile';
import { useToast } from '@/hooks/use-toast';
function convertDateFormat(dateString: string) {
    // Tách chuỗi ngày thành các phần
    const parts = dateString.split('/');

    // Kiểm tra nếu định dạng không hợp lệ
    if (parts.length !== 3) {
        throw new Error('Invalid date format. Please use dd/mm/yyyy format.');
    }

    // Lấy ngày, tháng, năm từ các phần đã tách
    const day = parts[0];
    const month = parts[1];
    const year = parts[2];

    // Trả về chuỗi ngày theo định dạng yyyy/mm/dd
    return `${year}/${month}/${day}`;
}

export default function ChangeWindow({ display_name, birthDay, resetInfo }: { display_name: string, birthDay: string, resetInfo?: () => Promise<void> }) {
    const { toast } = useToast()
    const [open, setOpen] = useState(false)
    const [name, setName] = useState("")
    const [birth, setBirth] = useState("")
    const handleSubmitName = async () => {
        try {
            await userApiRequest.update(
                {
                    "display_name": name
                }
            )
            toast({

                title: "Thành công",
                description: "Đã thay đổi thông tin",

            })
            setName("")
            if (resetInfo) {
                resetInfo()
            }
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",

            })
        }
    }
    const handleSubmitBirth = async () => {
        try {
            await userApiRequest.update(
                {
                    "birthday": convertDateFormat(birth)
                }
            )
            toast({

                title: "Thành công",
                description: "Đã thay đổi thông tin",

            })
            setBirth("")
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",

            })
        }
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant={"reset"} className='pt-[2px] pb-[2px] text-[14px] bg-[#282828]'>Chỉnh sửa hồ sơ người dùng</Button>
            </DialogTrigger>
            <DialogContent className="">
                <Tabs defaultValue="account" className="w-[450px]">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="Tên hiển thị">Tên hiển thị</TabsTrigger>
                        <TabsTrigger value="Ngày sinh">Ngày sinh</TabsTrigger>
                    </TabsList>
                    <TabsContent value="Tên hiển thị">
                        <Card>
                            <CardHeader>
                                <CardTitle>Tên hiển thị</CardTitle>
                                <CardDescription>
                                    Make changes to your account here. Click save when you're done.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="space-y-1">
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" defaultValue={display_name} onChange={e => setName(e.target.value)} />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button onClick={handleSubmitName}>xác nhận thay đổi</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                    <TabsContent value="Ngày sinh">
                        <Card>
                            <CardHeader>
                                <CardTitle>Ngày sinh</CardTitle>
                                <CardDescription>
                                    Change your password here. After saving, you'll be logged out.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="space-y-1">
                                    <Label htmlFor="current">Ngày sinh</Label>
                                    <Input id="current" defaultValue={birthDay} onChange={e => setBirth(e.target.value)} />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button onClick={handleSubmitBirth}>Xác nhận thay đổi</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    )

}
