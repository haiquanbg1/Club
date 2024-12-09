import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useToast } from '@/hooks/use-toast'
import { Button } from "@/components/ui/button"
import { useEffect } from "react"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { loginBody, LoginBodyType } from "@/schemaValidations/auth.schema"
import authApiRequest from "@/apiRequest/auth"
import { useNavigate } from "react-router-dom"
const formSchema = loginBody;
export default function LoginForm() {
    const navigate = useNavigate()
    const { toast } = useToast()
    const form = useForm<LoginBodyType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    })

    useEffect(() => {
        // Load Turnstile script
        const script = document.createElement("script");
        script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const onSubmit = async (values: any) => {
        const token = (document.querySelector('[name="cf-turnstile-response"]') as HTMLInputElement)?.value;

        // Gửi token đến backend để xác minh CAPTCHA
        const res = await fetch("http://fall2024c8g7.int3306.freeddns.org/api/v1/auth/verify-turnstile", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ "cf-turnstile-response": token }),
        });
        const result = await res.json();
        if (!result.success) {
            toast({
                description: "Capcha error"
                // description: "There was a problem with your request.",
            })
        }
        try {
            const result = await authApiRequest.login(values)
            toast({
                description: result?.payload.message
                // description: "There was a problem with your request.",
            })
            localStorage.setItem("name", result.payload.data.user.display_name)
            localStorage.setItem("avatar", result.payload.data.user.avatar)
            localStorage.setItem("user_id", result.payload.data.user.id)
            console.log(result)
            navigate('/')
        } catch (error: any) {
            console.log(error.payload)
            const errors = error.payload.message
            if (error.status === 400) {
                form.setError('password', {
                    type: 'server',
                    message: errors
                })
            }
            else if (error.status === 404) {
                form.setError('username', {
                    type: 'server',
                    message: errors
                })
            }
            else {
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
                <div
                    className="cf-turnstile"
                    data-sitekey={import.meta.env.VITE_PUBLIC_TURNSTILE_SITE_KEY}
                ></div>
                <Button type="submit" className="w-full text-[20px] font-bold">Đăng nhập</Button>
            </form>
        </Form>
    )
}
