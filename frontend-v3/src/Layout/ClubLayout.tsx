import MemberBox from "@/components/MemberBox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BellRing, Ellipsis } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import FeatureBox from "@/components/FeatureBox";

function ClubLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex ">
            <div className=" bg-[#252525] min-w-[280px] h-screen flex flex-col">
                <div className="w-full  bg-[#434242] p-2 flex justify-between items-center">
                    <Input className="text-[#888888] bg-[#3B3B3B] focus-visible:ring-0 focus:outline-none focus:border-none focus:ring-none border-transparent ring-offset-0" placeholder="Tìm kiếm cuộc trò chuyện"></Input>
                </div>
                <div className="overflow-auto flex-1 scrollbar-hide">
                    <div className="flex items-center justify-between p-2">
                        <div></div>
                        <h1 className="text-center text-[24px] font-bold">Nemui</h1>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Ellipsis className="cursor-pointer" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56 bg-gray-200 text-[black]">
                                {/* <DropdownMenuLabel>Appearance</DropdownMenuLabel> */}
                                {/* <DropdownMenuSeparator /> */}
                                <DropdownMenuCheckboxItem
                                    className="pl-2  text-[18px] focus:bg-gray-300 focus:text-[black]  "
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
                                >
                                    Đổi thông tin
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem
                                    className="pl-2  text-[18px] focus:bg-gray-300 focus:text-[black]"
                                >
                                    <p className="text-red-700">Xóa câu lạc bộ</p>
                                </DropdownMenuCheckboxItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div className="p-1 flex items-center justify-center space-x-4 pt-2 pb-2 border-t-[1px] border-b-[1px] border-[#999999] hover:bg-slate-400">
                        <BellRing size={24} />
                        <p className="text-[20px]">Thông báo tổng</p>
                    </div>
                    {/* <div>
                    <h2>Các ban trực thuộc</h2>
                    <p>Ban chuyên môn</p>
                    <p>Ban hậu cần</p>
                    <p>Ban truyền thông</p>
                </div> */}
                    <div className="space-y-2 pt-1 mt-2 pb-1">
                        <FeatureBox group="Các ban trực thuộc" />
                        <FeatureBox group="Sự kiện chưa đăng ký" />
                        <FeatureBox group="Sự kiện đã đăng ký" />
                        <FeatureBox group="Các nhóm chat" />
                    </div>
                </div>


            </div>
            <div className="w-full flex flex-col h-screen">{children}</div>
            <MemberBox />
        </div>
    );
}

export default ClubLayout;