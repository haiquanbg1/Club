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

const OtpSchema = OtpBody;
export default function OtpForm(
    { data, setShowOtp, form }: { data: RegisterBodyType, setShowOtp: React.Dispatch<React.SetStateAction<boolean>>, form: any }) {
    console.log(data)
    const { toast } = useToast()
    const OtpForm = useForm<OtpBodyType>({
        resolver: zodResolver(OtpSchema),
        defaultValues: {
            otp: ''
        },
    })

    const sendOtp = () => {
        authApiRequest.getOTP(data)
    }
    const backHandle = () => {
        setShowOtp(false)
    }

    async function onOtpSubmit(values: OtpBodyType) {
        console.log({
            ...values,
            username: data.username
        })
        try {
            const result = await authApiRequest.verifyOTP(
                {
                    ...values,
                    username: data.username
                }
            )
            toast({
                description: result.payload.message
                // description: "There was a problem with your request.",
            })
            await authApiRequest.register(data)
            OtpForm.reset()
            form.reset()
            setShowOtp(false)

        } catch (error: any) {
            // console.log(error.payload)
            const errors = error.payload.message
            //     const errors = error.payload.errors as {
            //         field: string
            //         message: string
            //     }[]
            if (error.status === 409) {
                OtpForm.setError('otp', {
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
        }
    }
    return (
        <Form {...OtpForm}>
            <form onSubmit={OtpForm.handleSubmit(onOtpSubmit)} className="w-full space-y-6">
                <FormField
                    control={OtpForm.control}
                    name="otp"
                    render={({ field }) => (
                        <FormItem
                            className="w-full">
                            <FormLabel className="text-center block text-[20px] font-bold">One-Time Password</FormLabel>
                            <FormControl>
                                <InputOTP
                                    maxLength={6}
                                    {...field}
                                    pattern={REGEXP_ONLY_DIGITS}
                                // value={OTP}
                                // onChange={OTP => setOTP(OTP)}
                                >
                                    <InputOTPGroup className="w-full">
                                        <InputOTPSlot className="w-full" index={0} />
                                        <InputOTPSlot className="w-full" index={1} />
                                        <InputOTPSlot className="w-full" index={2} />
                                        <InputOTPSlot className="w-full" index={3} />
                                        <InputOTPSlot className="w-full" index={4} />
                                        <InputOTPSlot className="w-full" index={5} />
                                    </InputOTPGroup>
                                </InputOTP>
                            </FormControl>
                            <FormDescription className="text-center">
                                Hãy nhập OTP được gửi đến gmail của bạn.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex justify-between">
                    <Button onClick={backHandle} variant={"secondary"} className="text-red-500" >Quay lại</Button>

                    <Button onClick={sendOtp} variant={"secondary"} className="text-blue-500">Gửi lại otp</Button>
                </div>
                <div className="w-full flex justify-center">
                    <Button type="submit" className="w-2/3 m-auto text-[20px] font-bold">Submit</Button>
                </div>
            </form>
        </Form>
    )
}
