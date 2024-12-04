import { Mail, Pencil, CirclePlus, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,

    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
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

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { EventBody, EventBodyType } from "@/schemaValidations/club.schema";
import { format, parse } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { useEffect } from "react";
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import EventMemberAdd from "@/components/EventMemberAdd"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import ClubApiRequest from "@/apiRequest/club"
import { useToast } from "@/hooks/use-toast";
const eventSchema = EventBody


interface header {
    title: string;
    start_time: string;
    description: string;
    resetMember: () => Promise<void>;
    resetInfo: () => Promise<void>;
    isAdmin: boolean
}
export default function Header({ title, start_time, isAdmin, description, resetInfo, resetMember }: header) {
    const { toast } = useToast()
    const [open, setOpen] = useState<boolean>(false)
    const [openSetting, setOpenSetting] = useState<boolean>(false)
    const [eventOpen, setEventOpen] = useState(false)

    const navigate = useNavigate()
    const { eventId, clubId } = useParams()

    const eventForm = useForm<EventBodyType>({
        resolver: zodResolver(eventSchema),
        defaultValues: {
            club_id: "",
            name: title,
            description: description,
            // start_time: parse(start_time, "yyyy-MM-dd", new Date())
        },
    })

    const handleOut = async () => {
        try {
            const res = await ClubApiRequest.outEvent({ event_id: eventId || "" })
            navigate(`/club/${clubId}`)
            console.log(res)
        } catch (error) {

        }
    }
    const handleDelete = async () => {
        const body = {
            event_id: eventId || "",
            club_id: clubId || ""
        }
        try {
            const res = await ClubApiRequest.deleteEvent(body)
            navigate(`/club/${clubId}`)

        } catch (error) {

        }
    }
    const updateEvent = async (values: EventBodyType) => {
        try {
            const body = {
                event_id: eventId || "",
                club_id: clubId || "",
                name: values.name,
                description: values.description,
                start_time: format(values.start_time, "yyyy/MM/dd"),
            }
            const res = await ClubApiRequest.updateEvent(body)
            console.log(res)
            setEventOpen(false)
            resetInfo()
        } catch (error) {

        }

    }
    return (
        <div className="justify-between items-center w-full p-2 bg-[#393E46]">
            <p className="text-[30px] font-bold">{title}</p>
            {/* <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Ellipsis size={30} className="cursor-pointer" />
                </DropdownMenuTrigger>
                <DropdownMenuContent >
                    <DropdownMenuItem className="text-[18px]">Thêm lịch trình</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu> */}
            <div className="border-t border-[#444a53] w-full my-4"></div>
            <div className="flex space-x-2">
                {
                    isAdmin &&
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger className="ml-auto flex items-center  rounded-lg text-white bg-[#444a53] hover:bg-[#4e555f] text-[18px] justify-center cursor-pointer space-x-2">
                            <div className="ml-auto flex items-center pl-4 pr-4 rounded-lg text-white bg-[#444a53] hover:bg-[#4e555f] text-[18px] justify-center cursor-pointer space-x-2">
                                <Mail />
                                <Button className="flex-1 text-white bg-transparent hover:bg-transparent p-0  text-[18px]">Mời</Button>
                            </div>
                        </DialogTrigger>
                        <DialogContent className="bg-[#4F4F4F] p-0 overflow-hidden">
                            <DialogHeader>
                                <DialogTitle>
                                    <div className="text-center bg-[#414141] pt-4 pb-4 text-[24px] mb-0">Thêm thành viên</div>
                                </DialogTitle>
                            </DialogHeader>
                            <EventMemberAdd resetMember={resetMember} setOpen={setOpen} />
                        </DialogContent>
                    </Dialog>
                }

                {isAdmin &&
                    <Dialog open={eventOpen} onOpenChange={setEventOpen}>
                        <DialogTrigger>
                            <div className="flex items-center pl-4 pr-4 rounded-lg text-white bg-[#444a53] hover:bg-[#4e555f] text-[18px] justify-center cursor-pointer space-x-2">
                                <Pencil />
                                <Button className="flex-1 text-white bg-transparent hover:bg-transparent p-0  text-[18px]">Chỉnh sửa</Button>
                            </div>
                        </DialogTrigger>
                        <DialogContent className="p-4">
                            <DialogHeader>
                                <DialogTitle>
                                    <div className="text-center space-y-4 mb-2">
                                        <h1 className="text-[24px]">Sự kiện của bạn là về chủ đề gì?</h1>
                                        <p className="text-[#ccc] font-thin text-[16px]">Điền thông tin chi tiết cho sự kiện của bạn</p>
                                    </div>
                                </DialogTitle>
                            </DialogHeader>
                            <Form {...eventForm}>
                                <form onSubmit={eventForm.handleSubmit(updateEvent)} className="space-y-8">
                                    <FormField
                                        control={eventForm.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Chủ đề của sự kiện *</FormLabel>
                                                <FormControl>
                                                    <Input id="topic" className="outline-none" type="text" placeholder="Chủ đề sự kiện của bạn là gì?"{...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={eventForm.control}
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
                                        control={eventForm.control}
                                        name="description"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Mô tả</FormLabel>
                                                <FormControl>
                                                    <textarea id="topic" className="w-full outline-none resize-none bg-transparent h-[160px] border-[solid] border-[1px] p-2 scrollbar-hide" placeholder="Cho mọi người biết thêm một chút về sự kiện của bạn" {...field} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <div className="flex">
                                        <Button className="ml-auto" type="submit">Confirm</Button>
                                    </div>
                                </form>
                            </Form>
                        </DialogContent>
                    </Dialog>
                }




                <Dialog open={openSetting} onOpenChange={setOpenSetting}>
                    <DialogTrigger className="ml-auto flex items-center  rounded-lg text-white bg-[#444a53] hover:bg-[#4e555f] text-[18px] justify-center cursor-pointer space-x-2">
                        <div className="flex items-center pl-4 pr-4 rounded-lg text-white bg-[#444a53] hover:bg-[#4e555f] text-[18px] justify-center cursor-pointer space-x-2">
                            <Settings />
                            <Button className="flex-1 text-white bg-transparent hover:bg-transparent p-0  text-[18px]">Tùy chỉnh</Button>
                        </div>
                    </DialogTrigger>
                    <DialogContent className="bg-[#393E46] p-0 overflow-hidden">
                        <DialogHeader>
                            <DialogTitle>
                                <div className="text-center bg-[#313338] pt-4 pb-4 text-[24px] mb-0">Tùy chỉnh</div>
                            </DialogTitle>
                        </DialogHeader>
                        <div className=" text-[20px] space-y-2">
                            {
                                isAdmin &&
                                <div className="p-2 hover:bg-[#444a53]" onClick={handleDelete}>Xóa sự kiện</div>
                            }
                            {
                                !isAdmin &&
                                <div className="p-2 hover:bg-[#444a53]" onClick={handleOut}>Rời khỏi sự kiện</div>

                            }
                        </div>

                    </DialogContent>
                </Dialog>

            </div>
        </div >
    )
}
