import { Mail, Pencil, CirclePlus, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,

    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import EventMemberAdd from "@/components/EventMemberAdd"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import ClubApiRequest from "@/apiRequest/club"

interface header {
    name: string;
    resetMember: () => Promise<void>;
}
export default function Header({ name, resetMember }: header) {
    const [open, setOpen] = useState<boolean>(false)
    const [openSetting, setOpenSetting] = useState<boolean>(false)
    const navigate = useNavigate()
    const { eventId, clubId } = useParams()

    const handleOut = async () => {
        try {
            const res = await ClubApiRequest.outEvent({ event_id: eventId || "" })
            navigate(`/club/${clubId}`)
            console.log(res)
        } catch (error) {

        }
    }
    return (
        <div className="justify-between items-center w-full p-2 bg-[#393E46]">
            <p className="text-[30px] font-bold">{name}</p>
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

                <div className="flex items-center pl-4 pr-4 rounded-lg text-white bg-[#444a53] hover:bg-[#4e555f] text-[18px] justify-center cursor-pointer space-x-2">
                    <Pencil />
                    <Button className="flex-1 text-white bg-transparent hover:bg-transparent p-0  text-[18px]">Chỉnh sửa</Button>
                </div>

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
                            <div className="p-2 hover:bg-[#444a53]">Xóa sự kiện</div>
                            <div className="p-2 hover:bg-[#444a53]" onClick={handleOut}>Rời khỏi sự kiện</div>
                        </div>

                    </DialogContent>
                </Dialog>

            </div>
        </div>
    )
}
