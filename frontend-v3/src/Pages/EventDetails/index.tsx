import AddWork from "./AddSchedule";
import Details from "./Details";
import Header from "./Header";
import MemberList from "./MemberList";
import Request from "./Request";
import Schedule from "./Schedule";
import ClubApiRequest from "@/apiRequest/club";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

interface event {
    start_time: string;
    name: string;
    description: string;
    event_id: string;
}
export default function EventDetailsPage() {
    const { eventId, clubId } = useParams();
    console.log(clubId)
    const id = localStorage.getItem("club_id")
    const [event, setEvent] = useState<event>()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await ClubApiRequest.getEvent({ id: id ? id : "", event_id: eventId ? eventId : "" })
                // Giả sử API trả về mảng các object có cấu trúc tương tự Item
                setEvent(response.payload.data[0]);
                console.log("response" + response.payload.data[0])
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [])
    console.log(event)

    return (
        <div className="flex flex-col h-screen">
            <div className="flex-1 overflow-auto scrollbar-hide">
                <Header name={event?.name ? event.name : ""} />
                <div className="pl-[40px] pr-[40px] flex space-x-2">
                    <div className="flex-[2]">
                        <Details time={event?.start_time} type={event?.description} />
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
