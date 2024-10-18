'use client'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { useToast } from "@/hooks/use-toast"
import { Input } from "@/components/ui/input"
import { ChangePasswordForm, ChangePasswordFormType } from "@/schemaValidations/profile.schema"
import userApiRequest from "@/apiRequest/userProfile"
import { useState } from "react"

const formSchema = ChangePasswordForm

export default function Password() {
    const [open, setOpen] = useState(false)
    const { toast } = useToast()
    const form = useForm<ChangePasswordFormType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            curPass: "",
            newPass: "",
            newPassAgain: ""
        },
    })
    const onSubmit = async (values: ChangePasswordFormType) => {
        try {
            const res = await userApiRequest.changePassword(values)
            toast({
                description: res?.payload.message
                // description: "There was a problem with your request.",
            })
            form.reset()
            setOpen(false)
        } catch (error: any) {
            console.log(error.status)
            if (error.status === 400) {
                form.setError('curPass', {
                    type: 'server',
                    message: "Mật khẩu không đúng"
                })
            }
        }
    }
    return (
        <div className='w-full'>
            <h3 className='text-[20px] mb-[10px]'>Mật khẩu và xác thực</h3>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant={"blue"} className="text-[14px] p-[5px] bg-[#4F75FF]">Đổi mật khẩu </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit profile</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="curPass"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Mật khẩu hiện tại</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Nhập mật khẩu hiện tại" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="newPass"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Mật khẩu mới</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Nhập mật khẩu mới" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="newPassAgain"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Xác nhận mật khẩu mới</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Nhập lại mật khẩu mới" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Xác nhận thay đổi</Button>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
