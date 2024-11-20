import { RegisterClubBody, RegisterClubBodyType } from "@/schemaValidations/club.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    // FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import ClubApiRequest from "@/apiRequest/club"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"



const formSchema = RegisterClubBody
export default function CreateClubForm() {
    const { toast } = useToast()
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };
    const form = useForm<RegisterClubBodyType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: ""
        },
    })
    const onSubmit = async (values: RegisterClubBodyType) => {
        const formData: FormData = new FormData();
        formData.append("userData", JSON.stringify(values));
        formData.append('avatar', selectedFile ? selectedFile : "");
        try {
            const res = await ClubApiRequest.create(formData)
            console.log(res)
            setSelectedFile(null)
            form.reset()
            toast({
                description: "Tạo câu lạc bộ thành công"
                // description: "There was a problem with your request.",
            })
        } catch (errors: any) {
            console.log(errors.payload)
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tên câu lạc bộ</FormLabel>
                            <FormControl>
                                <Input placeholder="Nhập tên câu lạc bộ" {...field} className="focus-visible:ring-2 focus-visible:ring-offset-10" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Mô tả về câu lạc bộ</FormLabel>
                            <FormControl>
                                <Input placeholder="Nhập mô tả về câu lạc bộ"  {...field} className="focus-visible:ring-2 focus-visible:ring-offset-10" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="grid w-full  items-center gap-3">
                    <Label htmlFor="picture">Chọn ảnh đại diện</Label>
                    <Input id="picture" type="file" onChange={handleFileChange} />
                </div>
                <Button type="submit" className="w-full text-[20px] font-bold">Đăng ký câu lạc bộ</Button>
            </form>
        </Form>
    )
}
