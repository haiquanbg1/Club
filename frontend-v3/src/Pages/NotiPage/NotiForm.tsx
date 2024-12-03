
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
import { Input } from "@/components/ui/input"
import { NotificationBody, NotificationBodyType } from "@/schemaValidations/notification"
import { useParams } from "react-router-dom"
import NotificationApiRequest from "@/apiRequest/notification"
import { useState } from "react"

const NotiFormSchema = NotificationBody
export default function NotiForm({ setOpen }: { setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    const { clubId } = useParams()
    const form = useForm<NotificationBodyType>({
        resolver: zodResolver(NotiFormSchema),
        defaultValues: {
            title: "",
            description: "",
            club_id: ""
        },
    })

    // 2. Define a submit handler.
    const onSubmit = async (values: NotificationBodyType) => {
        try {
            const body = {
                title: values.title,
                description: values.description,
                club_id: clubId || ""
            }

            const res = await NotificationApiRequest.create(body)
            setOpen(false)
            form.reset()
            console.log(res)
        } catch (error) {

        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-[16px]">Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Loại thông báo" {...field} />
                            </FormControl>
                            <FormDescription>

                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-[16px]">Descrition</FormLabel>
                            <FormControl>
                                <textarea className="w-full rounded-lg outline-none resize-none bg-transparent h-[160px] border-[solid] border-[1px] p-2 scrollbar-hide" placeholder="Nhập chi tiết thông báo của bạn" {...field} />
                            </FormControl>
                            <FormDescription>
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}
