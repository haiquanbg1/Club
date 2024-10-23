import { RegisterClubBody, RegisterClubBodyType } from "@/schemaValidations/Club.schema"
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


const formSchema = RegisterClubBody
export default function CreateClubForm() {
    const form = useForm<RegisterClubBodyType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: ""
        },
    })
    const onSubmit = async (values: RegisterClubBodyType) => {
        console.log(1)
        try {
            const res = await ClubApiRequest.create(values)
            console.log(res)
            form.reset()
        } catch (errors: any) {
            console.log(errors.payload.message)
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
                                <Input placeholder="Nhập mô tả về câu lạc bộ" type='password' {...field} className="focus-visible:ring-2 focus-visible:ring-offset-10" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full text-[20px] font-bold">Đăng nhập</Button>
            </form>
        </Form>
    )
}
