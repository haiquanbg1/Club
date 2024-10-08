"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input"
import { OtpBody, OtpBodyType, RegisterBody, RegisterBodyType, validateDate } from "@/schemaValidations/auth.schema"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import authApiRequest from "@/apiRequest/auth"
import OtpForm from "./OtpForm"


const formSchema = RegisterBody;

export function RegisterForm() {
    const [loading, setLoading] = useState(false)
    const { toast } = useToast()
    const [showOTP, setShowOTP] = useState(false)
    const form = useForm<RegisterBodyType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            display_name: '',
            username: "",
            password: "",
            confirmPassword: '',
            birthday: ""
        },
    })


    async function onSubmit(values: RegisterBodyType) {
        // console.log(values)
        if (loading) return
        setLoading(true)
        if (!validateDate(values.birthday)) {
            form.setError('birthday', {
                type: 'server',
                message: "Định dạng ngày sinh không hợp lệ"
            })
            return
        }
        try {
            const result = await authApiRequest.getOTP(values)
            toast({
                description: result?.payload.message
                // description: "There was a problem with your request.",
            })
            setShowOTP(true)
        } catch (error: any) {
            const errors = error.payload.message
            //     const errors = error.payload.errors as {
            //         field: string
            //         message: string
            //     }[]
            if (error.status === 409) {
                form.setError('username', {
                    type: 'server',
                    message: errors
                })
            } else {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: "There was a problem with your request.",
                })
            }
        } finally {
            setLoading(false)
        }

    }


    return (
        <div className="w-full">
            {
                !showOTP &&
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full mt-[0px]">
                        <FormField
                            control={form.control}
                            name="display_name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nhập tên" {...field} className="focus-visible:ring-2 focus-visible:ring-offset-10" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-between space-x-1">
                            <FormField
                                control={form.control}
                                name="birthday"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>D.O.B</FormLabel>
                                        <FormControl>
                                            <Input placeholder="YYYY/MM/DD" {...field} className="focus-visible:ring-2 focus-visible:ring-offset-10" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="gender"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Gender</FormLabel>
                                        <Select onValueChange={value => value === "Nam" ? form.setValue("gender", 1) : form.setValue("gender", 0)}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Chọn giới tính" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value={"Nam"}>Nam</SelectItem>
                                                <SelectItem value={"Nữ"}>Nữ</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                        </div>
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nhập email" {...field} className="focus-visible:ring-2 focus-visible:ring-offset-10" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nhập mật khẩu" type='password' {...field} className="focus-visible:ring-2 focus-visible:ring-offset-10" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nhập lại mật khẩu" type='password' {...field} className="focus-visible:ring-2 focus-visible:ring-offset-10" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button disabled={loading} type="submit" className="w-full text-[20px] font-bold">Đăng ký</Button>
                    </form>
                </Form>
            }
            {
                showOTP &&
                <OtpForm data={form.getValues()} setShowOtp={setShowOTP} form={form} />
            }

        </div >
    )
}
