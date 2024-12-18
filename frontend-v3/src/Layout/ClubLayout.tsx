import MemberBox from "@/components/MemberBox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BellRing, Ellipsis } from "lucide-react";
import { ChevronRight } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    // DropdownMenuLabel,
    // DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    // DialogTrigger,
    // DialogFooter
} from "@/components/ui/dialog"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { useEffect } from "react";
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

// import { Label } from "@/components/ui/label"
import FeatureBox from "@/components/FeatureBox";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { EventBody, EventBodyType } from "@/schemaValidations/club.schema";
import {
    Form,
    FormControl,
    // FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ClubApiRequest from "@/apiRequest/club";
import CreateChatForm from "@/components/CreateChatForm";
import ChatApiRequest from "@/apiRequest/chat";
import ChatMemberBox from "@/components/ChatMemberBox";
import { useToast } from "@/hooks/use-toast";
import NotificationApiRequest from "@/apiRequest/notification";

const eventSchema = EventBody

interface event {
    name: string;
    event_id: string
}

interface chat {
    conversation_id: string;
    name: string
}

function ClubLayout({ children }: { children: React.ReactNode }) {
    // const clubId = useSelector((state: RootState) => state.club.clubId);
    const { toast } = useToast()
    const location = useLocation()
    const { clubId } = useParams()
    const [eventOpen, setEventOpen] = useState(false)
    const [chatOpen, setChatOpen] = useState(false)
    const [chats, setChats] = useState<chat[]>([])
    const [joinedEvent, setJoinedEvent] = useState<event[]>([])
    const [focusNoti, setFocusNoti] = useState(false)
    const adminList = localStorage.getItem("adminClubs")
    const [checkRole, setCheckRole] = useState(false)
    useEffect(() => {
        if (clubId && adminList?.includes(clubId)) {
            setCheckRole(true)
        }
    }, [])
    // const [date, setDate] = useState<Date>()
    const navigate = useNavigate()
    // const { id } = useParams()
    const [isChatPage, setIsChatPage] = useState(false)
    useEffect(() => {
        const regex = /^\/club\/\d+\/conversation\/\d+$/;
        if (regex.test(location.pathname)) {
            setIsChatPage(true)
        }
        else {
            setIsChatPage(false)
        }
    }, [location])
    const eventForm = useForm<EventBodyType>({
        resolver: zodResolver(eventSchema),
        defaultValues: {
            club_id: "",
            name: "",
            description: "",

        },
    })
    useEffect(() => {
        const regex = /^\/club\/([^\/]+)\/notification$/;
        const match = location.pathname.match(regex);
        if (match) {
            setFocusNoti(true)
        }
        else {
            setFocusNoti(false)
        }
    }, [location])
    const createEvent = async (values: EventBodyType) => {
        try {
            const body = {
                club_id: clubId || "",
                name: values.name,
                description: values.description,
                start_time: format(values.start_time, "yyyy/MM/dd"),
            }
            await ClubApiRequest.createEvent(body)
            // sau khi tạo sẽ gửi thông báo
            // await NotificationApiRequest.create({
            //     title: "Sự kiện mới",
            //     description: `Đã thêm sự kiện mới trong câu lạc bộ`,
            //     club_id: clubId || ""
            // })
            toast({

                title: "Thành công",
                description: "Tạo sự kiện thành công.",
            })
            setEventOpen(false)
            getJoinedEvent()
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
            })
        }
    }

    useEffect(() => {
        if (!eventOpen) {
            eventForm.reset()
        }
    }, [eventOpen]);

    const getJoinedEvent = async () => {
        localStorage.setItem("callEvent", "true")
        try {
            const response = await ClubApiRequest.getJoinedEvent(clubId ? clubId : "")

            // Giả sử API trả về mảng các object có cấu trúc tương tự Item
            setJoinedEvent(response.payload.data);
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
            })
        }
    }
    useEffect(() => {
        getJoinedEvent()
    }, [localStorage.getItem("callEvent")])

    const getChat = async () => {
        try {
            const res = await ChatApiRequest.get(clubId || "")
            setChats(res.payload.data)
        } catch (error) {

        }
    }
    useEffect(() => {
        getChat()
    }, [])

    const handleDeleteClub = async () => {
        try {
            const body = {
                "club_id": clubId || ""
            }
            await ClubApiRequest.delete(body)
            navigate("/")
            localStorage.setItem("call", "false")
        } catch (error) {

        }
    }
    return (
        <div className="flex ">
            <div className=" bg-[#2b2d31] min-w-[280px] h-screen flex flex-col">
                <div className="w-full p-2 flex justify-between items-center">
                    <Input className="text-[#888888] bg-[#1e1f22] focus-visible:ring-0 focus:outline-none focus:border-none focus:ring-none border-transparent ring-offset-0" placeholder="Tìm kiếm cuộc trò chuyện"></Input>
                </div>
                <div className="overflow-auto flex-1 scrollbar-hide">
                    <div className="flex items-center justify-between p-2 cursor-pointer" onClick={() => navigate(`/club/${clubId}`)}>
                        <div></div>
                        <h1 className="text-center text-[24px] font-bold">Nemui</h1>
                        {
                            checkRole &&
                            (<>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Ellipsis className="cursor-pointer" />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56 bg-gray-200 text-[black]">
                                        <DropdownMenuCheckboxItem
                                            className="pl-2  text-[18px] focus:bg-gray-300 focus:text-[black]  "
                                            onClick={() => setEventOpen(!eventOpen)}
                                        >
                                            Thêm sự kiện
                                        </DropdownMenuCheckboxItem>
                                        <DropdownMenuCheckboxItem
                                            className="pl-2  text-[18px] focus:bg-gray-300 focus:text-[black]"
                                        >
                                            Thêm ban trực thuộc
                                        </DropdownMenuCheckboxItem>
                                        <DropdownMenuCheckboxItem
                                            className="pl-2  text-[18px] focus:bg-gray-300 focus:text-[black]"
                                            onClick={() => setChatOpen(true)}
                                        >
                                            Thêm nhóm chat
                                        </DropdownMenuCheckboxItem>
                                        <DropdownMenuCheckboxItem
                                            className="pl-2  text-[18px] focus:bg-gray-300 focus:text-[black]"
                                            onClick={() => navigate(`/club/changeProfile/${clubId}`)}
                                        >
                                            Đổi thông tin
                                        </DropdownMenuCheckboxItem>
                                        <DropdownMenuCheckboxItem
                                            className="pl-2  text-[18px] focus:bg-gray-300 focus:text-[black]"
                                            onClick={handleDeleteClub}
                                        >
                                            <p className="text-red-700">Xóa câu lạc bộ</p>
                                        </DropdownMenuCheckboxItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>

                                <Dialog open={chatOpen} onOpenChange={setChatOpen}>
                                    <DialogContent className="p-4 bg-[#313338]">
                                        <DialogHeader>
                                            <DialogTitle className="text-[24px]">Tạo nhóm chat mới</DialogTitle>
                                            <DialogDescription>

                                            </DialogDescription>
                                        </DialogHeader>
                                        <CreateChatForm setChatOpen={setChatOpen}></CreateChatForm>
                                    </DialogContent>
                                </Dialog>

                                <Dialog open={eventOpen} onOpenChange={setEventOpen}>
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
                                            <form onSubmit={eventForm.handleSubmit(createEvent)} className="space-y-8">
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
                            </>)
                        }
                        {
                            !checkRole &&
                            <div></div>
                        }

                    </div>

                    <div onClick={() => navigate(`/club/${clubId}/notification`)} className={!focusNoti ? "cursor-pointer p-1 flex items-center justify-center space-x-4 pt-2 pb-2 border-t-[1px] border-b-[1px] border-[#393e46] hover:bg-[#393e46]" : "cursor-pointer p-1 flex items-center justify-center space-x-4 pt-2 pb-2 border-t-[1px] border-b-[1px] border-[#393e46] bg-[#393e46]"}>
                        <BellRing size={24} />
                        <p className="text-[20px]">Thông báo tổng</p>
                    </div>

                    <div className="space-y-2 pt-1 mt-2 pb-1">
                        <FeatureBox group="Các ban trực thuộc" />
                        {/* <FeatureBox group="Sự kiện chưa đăng ký" /> */}
                        <div className="flex items-center hover:bg-slate-400 cursor-pointer select-none" onClick={() => navigate(`/club/listEvent/${clubId}`)}>
                            <ChevronRight />
                            <h1 className="text-[20px]">Sự kiện chưa đăng ký</h1>
                        </div>
                        <FeatureBox group="Sự kiện đã đăng ký" names={joinedEvent} />
                        <FeatureBox group="Các nhóm chat" chats={chats} />
                    </div>
                </div>


            </div>
            <div className="w-full flex flex-col h-screen bg-[#313338]">{children}</div>
            {
                ((!focusNoti || !isChatPage) && !isChatPage) &&
                <MemberBox />
            }
            {
                isChatPage &&
                <ChatMemberBox />
            }
        </div>
    );
}

export default ClubLayout;