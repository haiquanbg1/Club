import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { useParams } from "react-router-dom";
import ClubApiRequest from "@/apiRequest/club";

import { ScheduleBody, ScheduleBodyType } from "@/schemaValidations/club.schema";
import { useToast } from "@/hooks/use-toast";

const scheduleSchema = ScheduleBody;

export default function AddSchedule({ resetSchedules }: { resetSchedules: () => Promise<void> }) {
    const { toast } = useToast()
    const [eventOpen, setEventOpen] = useState(false)
    const { eventId } = useParams()
    const scheduleForm = useForm<ScheduleBodyType>({
        resolver: zodResolver(scheduleSchema),
        defaultValues: {
            title: "",
            description: "",
        },
    })
    useEffect(() => {
        scheduleForm.reset()
    }, [eventOpen])

    const createSchedule = async () => {
        try {
            const body = {
                event_id: eventId || "",
                title: scheduleForm.getValues("title"),
                description: scheduleForm.getValues("description"),
                start_time: format(scheduleForm.getValues("start_time"), "MM/dd/yyyy"),
                end_time: format(scheduleForm.getValues("end_time"), "MM/dd/yyyy"),
                // end_time: "",
                location: scheduleForm.getValues("location")
            }
            // const res = await ClubApiRequest.createEvent(body)
            await ClubApiRequest.createSchedule(body)
            resetSchedules()
            toast({
                description: "Tạo lịch trình thành công"
            })
            setEventOpen(false)
        } catch (error: any) {
            console.log(error.payload)
            toast({
                description: "Có lỗi xảy ra.",
                variant: "destructive", // Để lỗi hiển thị nổi bật
            });
        }
        // console.log(format(values.start_time, "MM/dd/yyyy"))
    }

    return (
        <div className='flex p-4 rounded-xl text-[18px] mt-4 bg-[#393E46] space-x-3'>
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            {/* <Button className="flex-1 text-white bg-[#444a53] hover:bg-[#4e555f] font-bold text-[18px]" onClick={() => setEventOpen(!eventOpen)}>Thêm bài viết</Button> */}
            <Dialog open={eventOpen} onOpenChange={setEventOpen}>
                <DialogTrigger asChild>
                    <Button className="flex-1 text-white bg-[#444a53] hover:bg-[#4e555f] font-bold text-[18px]">Thêm bài viết</Button>
                </DialogTrigger>
                <DialogContent className="p-4">
                    <DialogHeader>
                        <DialogTitle>
                            <div className="text-center space-y-4 mb-2">
                                <h1 className="text-[24px]">Lịch trình sắp tới của sự kiện là gì?</h1>
                                <p className="text-[#ccc] font-thin text-[16px]">Điền thông tin chi tiết cho lịch trình của bạn</p>
                            </div>
                        </DialogTitle>
                    </DialogHeader>
                    <Form {...scheduleForm}>
                        <form onSubmit={scheduleForm.handleSubmit(createSchedule)} className="space-y-8">
                            <FormField
                                control={scheduleForm.control}
                                // name="title"
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Chủ đề của lịch trình *</FormLabel>
                                        <FormControl>
                                            <Input className="outline-none" type="text" placeholder="Chủ đề sự kiện của bạn là gì?"{...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={scheduleForm.control}
                                name="start_time"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Ngày bắt đầu *</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-full pl-3 text-left font-normal",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(field.value, "MM/dd/yyyy")
                                                        ) : (
                                                            <span>Pick a date</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) =>
                                                        date < new Date()
                                                    }
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={scheduleForm.control}
                                name="end_time"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Ngày kết thúc *</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-full pl-3 text-left font-normal",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(field.value, "MM/dd/yyyy")
                                                        ) : (
                                                            <span>Pick a date</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) =>
                                                        date < new Date()
                                                    }
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={scheduleForm.control}
                                name="location"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Địa điểm</FormLabel>
                                        <FormControl>
                                            <Input className="outline-none" type="text" placeholder="Chủ đề sự kiện của bạn là gì?"{...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={scheduleForm.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Mô tả</FormLabel>
                                        <FormControl>
                                            <textarea className="w-full outline-none resize-none bg-transparent h-[160px] border-[solid] border-[1px] p-2 scrollbar-hide" placeholder="Cho mọi người biết thêm một chút về sự kiện của bạn" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <div className="flex">
                                <Button className="ml-auto" >Confirm</Button>
                            </div>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>

        </div>
    )
}
