import { Ellipsis } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
export default function Header() {
    return (
        <div className="flex justify-between items-center w-full p-2 bg-[#393E46]">
            <p className="text-[30px] font-bold">Sự kiện 1</p>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Ellipsis size={30} className="cursor-pointer" />
                </DropdownMenuTrigger>
                <DropdownMenuContent >
                    <DropdownMenuItem className="text-[18px]">Thêm lịch trình</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
