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
import { REGEXP_ONLY_DIGITS } from "input-otp"

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { Input } from "@/components/ui/input"
import { OtpBody, OtpBodyType, RegisterBody, RegisterBodyType } from "@/schemaValidations/auth.schema"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import authApiRequest from "@/apiRequest/auth"
import OtpForm from "./OtpForm"


const formSchema = RegisterBody;

export function RegisterForm() {
    const { toast } = useToast()
    const [showOTP, setShowOTP] = useState(false)
    const form = useForm<RegisterBodyType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            username: "",
            password: "",
            confirmPassword: ''
        },
    })

    async function onSubmit(values: RegisterBodyType) {
        setShowOTP(true)
        try {
            const result = await authApiRequest.getOTP(values)
            toast({
                description: result.payload.message
                // description: "There was a problem with your request.",
            })
            setShowOTP(true)
        } catch (error: any) {
            console.log(error)
            const errors = error.payload.errors as {
                field: string
                message: string
            }[]
            if (error.status === 422) {
                errors.forEach((error) => {
                    form.setError(error.field as 'username' | 'password', {
                        type: 'server',
                        message: error.message
                    })
                })
            } else {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: "There was a problem with your request.",
                })
            }
        }

    }


    return (
        <div className="w-full">
            {
                !showOTP &&
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full mb-[20px]">
                        <FormField
                            control={form.control}
                            name="name"
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
                        <Button type="submit" className="w-full text-[20px] font-bold">Đăng ký</Button>
                    </form>
                </Form>
            }
            {
                showOTP &&
                <OtpForm data={form.getValues()} />
            }

        </div>
    )
}
