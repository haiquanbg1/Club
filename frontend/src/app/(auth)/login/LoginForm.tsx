"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useToast } from '@/hooks/use-toast'
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
import { Input } from "@/components/ui/input"
import { loginBody, LoginBodyType } from "@/schemaValidations/auth.schema"
import authApiRequest from "@/apiRequest/auth"

const formSchema = loginBody;
export function LoginForm() {
    const { toast } = useToast()
    const form = useForm<LoginBodyType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    })

    async function onSubmit(values: LoginBodyType) {
        try {
            const result = await authApiRequest.login(values)
            toast({
                description: result.payload.message
                // description: "There was a problem with your request.",
            })
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
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
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
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="Nhập mật khẩu" type='password' {...field} className="focus-visible:ring-2 focus-visible:ring-offset-10" />
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
