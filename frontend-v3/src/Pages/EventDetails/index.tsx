import AddSchedule from "./AddSchedule";
import Details from "./Details";
import Header from "./Header";
import MemberList from "./MemberList";
import Request from "./Request";
import Schedule from "./Schedule";
import ClubApiRequest from "@/apiRequest/club";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ScheduleList from "./ScheduleList";

interface event {
    start_time: string;
    name: string;
    description: string;
    event_id: string;
}

interface user {
    display_name: string;
    avatar: string;
    user_id: string;
}

interface Schedule {
    id: string,
    title: string,
    description: string,
    start_time: string,
    end_time: string,
    location: string
}
export default function EventDetailsPage() {
    const { eventId, clubId } = useParams();

    // const id = localStorage.getItem("club_id")
    const [event, setEvent] = useState<event>()
    const [accepted, setAccepted] = useState<user[]>([])
    const [pending, setPending] = useState<user[]>([])
    const adminList = localStorage.getItem("adminClubs")
    const [checkRole, setCheckRole] = useState(false)
    useEffect(() => {
        if (clubId && adminList?.includes(clubId)) {
            setCheckRole(true)
        }
    }, [])
    useEffect(() => {
        getEvent();
    }, [eventId, clubId])

    const getEvent = async () => {

        try {
            const response = await ClubApiRequest.getEvent({ id: clubId ? clubId : "", event_id: eventId ? eventId : "" })
            // Giả sử API trả về mảng các object có cấu trúc tương tự Item
            setEvent(response.payload.data[0]);

        } catch (error) {

        }

    }

    useEffect(() => {
        getParticipantAccept();
    }, [eventId, clubId])

    const getParticipantAccept = async () => {

        try {
            const response = await ClubApiRequest.getParticipantAccepted(eventId ? eventId : "")
            // Giả sử API trả về mảng các object có cấu trúc tương tự Item
            setAccepted(response.payload.data);
        } catch (error) {

        }
    }
    const getParticipantPending = async () => {

        try {
            const response = await ClubApiRequest.getParticipantPending(eventId ? eventId : "")
            // Giả sử API trả về mảng các object có cấu trúc tương tự Item
            setPending(response.payload.data);
        } catch (error) {

        }
    }
    useEffect(() => {
        getParticipantPending()
    }, [eventId, clubId])

    const [schedules, setSchedules] = useState<Schedule[]>([])
    // const { eventId } = useParams()
    const getSchedules = async () => {
        try {
            const res = await ClubApiRequest.getSchedule(eventId || "")
            setSchedules(res.payload.data)

        } catch (error) {

        }
    }
    useEffect(() => {
        getSchedules()
    }, [eventId, clubId])




    return (
        <div className="flex flex-col h-screen">
            <div className="flex-1 overflow-auto scrollbar-hide">
                <Header isAdmin={checkRole} resetInfo={getEvent} resetMember={getParticipantAccept} start_time={event?.start_time || ""} description={event?.description || ""} title={event?.name ? event.name : ""} />
                <div className="pl-[40px] pr-[40px] flex space-x-2">
                    <div className="flex-[2]">
                        <Details time={event?.start_time} type={event?.description} quantity={accepted.length} />
                        {
                            checkRole &&
                            <AddSchedule resetSchedules={getSchedules} />
                        }
                        <div className="mt-[20px] mb-[20px] text-[#ccc] text-[20px] font-semibold">Lịch trình sự kiện</div>

                        <ScheduleList scheduleList={schedules} resetSchedules={getSchedules} />
                    </div>
                    <div className="flex-1">
                        {
                            checkRole &&
                            <Request members={pending} resetMember2={getParticipantPending} resetMember={getParticipantAccept} />

                        }
                        <MemberList members={accepted} resetMember={getParticipantAccept} />
                    </div>
                </div>
            </div>
        </div>
    )
}
