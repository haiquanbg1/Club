import AddWork from "./AddSchedule";
import Details from "./Details";
import Header from "./Header";
import MemberList from "./MemberList";
import Request from "./Request";
import Schedule from "./Schedule";


export default function EventDetailsPage() {
    return (
        <div className="flex flex-col h-screen">
            <div className="flex-1 overflow-auto scrollbar-hide">
                <Header />
                <div className="pl-[40px] pr-[40px] flex space-x-2">
                    <div className="flex-[2]">
                        <Details />
                        <AddWork />
                        <div className="mt-[20px] mb-[20px] text-[#ccc] text-[20px] font-semibold">Lịch trình sự kiện</div>

                        <Schedule />
                    </div>
                    <div className="flex-1">
                        <Request />
                        <MemberList />
                    </div>
                </div>
            </div>
        </div>
    )
}
