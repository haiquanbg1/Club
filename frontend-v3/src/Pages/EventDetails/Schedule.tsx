import { CalendarIcon, Ellipsis, Clock, MapPin, ReceiptText } from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    // DropdownMenuLabel,
    // DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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

} from "@/components/ui/dialog"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { format, parse } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import ClubApiRequest from "@/apiRequest/club"
import { useParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { UpdateScheduleBody, UpdateScheduleBodyType } from "@/schemaValidations/event.schema"
interface Schedule {
    title?: string
    id?: string,
    location?: string,
    description?: string,
    start_time: string,
    end_time: string,
    resetSchedules?: () => Promise<void>
}

const updateScheduleSchema = UpdateScheduleBody
export default function Schedule({ id, location, title, description, resetSchedules, start_time, end_time }: Schedule) {
    const { eventId, clubId } = useParams()
    const [scheduleOpen, setScheduleOpen] = useState(false)
    const UpdateScheduleForm = useForm<UpdateScheduleBodyType>({
        resolver: zodResolver(updateScheduleSchema),
        defaultValues: {
            title: title,
            description: description,
            location: location,
            start_time: parse(start_time, "yyyy-MM-dd", new Date()),
            end_time: parse(end_time, "yyyy-MM-dd", new Date())
        },
    })
    const handleDelete = async () => {
        console.log(eventId)
        console.log(id)

        try {
            const res = await ClubApiRequest.deleteSchedule({
                club_id: clubId || "",
                schedule_id: id || "",
            });
            if (resetSchedules) {
                resetSchedules();
            }
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        UpdateScheduleForm.reset()
    }, [scheduleOpen])
    const handleUpdate = async (values: UpdateScheduleBodyType) => {
        try {
            const body = {
                club_id: clubId || "",
                schedule_id: id || "",
                title: values.title || "",
                description: values.description || "",
                start_time: format(values.start_time, "MM/dd/yyyy"),
                end_time: format(values.end_time, "MM/dd/yyyy"),
                // end_time: "",
                location: ""
            }
            // const res = await ClubApiRequest.createEvent(body)
            const res = await ClubApiRequest.updateSchedule(body)
            if (resetSchedules) {
                resetSchedules()
            }
            console.log(res)
            setScheduleOpen(false)
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className="flex p-4 rounded-xl text-[18px] mt-4 bg-[#393E46] justify-between ">
            <div className="flex space-x-6">
                <div>
                    <CalendarIcon size={80}></CalendarIcon>
                </div>
                <div className="space-y-2">
                    <p className="font-bold text-[26px]">{title}</p>
                    <div className="flex space-x-2 text-[16px] items-center text-[#ccc]">
                        <Clock size={18} />
                        <p>{start_time}----{end_time}</p>
                    </div>
                    <div className="flex space-x-2 text-[20px] items-center ">
                        <MapPin size={22} />
                        <p>{location}</p>
                    </div>
                    <div className="flex space-x-2 text-[20px] items-center ">
                        <ReceiptText size={22} />
                        <p>{description}</p>
                    </div>
                </div>
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Ellipsis className="cursor-pointer" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-gray-200 text-[black]">

                    <DropdownMenuCheckboxItem
                        className="pl-2  text-[18px] focus:bg-gray-300 focus:text-[black]  "
                        onClick={() => setScheduleOpen(!scheduleOpen)}
                    >
                        Chỉnh sửa lịch trình
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                        className="pl-2  text-[18px] focus:bg-gray-300 focus:text-[black]"
                        onClick={handleDelete}
                    >
                        Xóa lịch trình
                    </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <Dialog open={scheduleOpen} onOpenChange={setScheduleOpen}>
                {/* <DialogTrigger asChild>
                    <Button className="flex-1 text-white bg-[#444a53] hover:bg-[#4e555f] font-bold text-[18px]">Thêm bài viết</Button>
                </DialogTrigger> */}
                <DialogContent className="p-4">
                    <DialogHeader>
                        <DialogTitle>
                            <div className="text-center space-y-4 mb-2">
                                <h1 className="text-[24px]">Lịch trình sắp tới của sự kiện là gì?</h1>
                                <p className="text-[#ccc] font-thin text-[16px]">Điền thông tin chi tiết cho lịch trình của bạn</p>
                            </div>
                        </DialogTitle>
                    </DialogHeader>
                    <Form {...UpdateScheduleForm}>
                        <form onSubmit={UpdateScheduleForm.handleSubmit(handleUpdate)} className="space-y-8">
                            <FormField
                                control={UpdateScheduleForm.control}
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
                                control={UpdateScheduleForm.control}
                                // name="title"
                                name="location"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Địa điểm *</FormLabel>
                                        <FormControl>
                                            <Input className="outline-none" type="text" placeholder="Chủ đề sự kiện của bạn là gì?"{...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={UpdateScheduleForm.control}
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
                                control={UpdateScheduleForm.control}
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
                                control={UpdateScheduleForm.control}
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
