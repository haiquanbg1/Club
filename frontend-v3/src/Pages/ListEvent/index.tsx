import EventCard from '@/components/EventCard'
import { GetEventResType } from '@/schemaValidations/event.schema'
import React, { useEffect, useState } from 'react'
import ClubApiRequest from '@/apiRequest/club'
import { UseDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { useParams } from 'react-router-dom'

interface event {
    start_time: string;
    name: string;
    description: string;
    event_id: string;
    status: string
};
export default function ListEventPage() {
    const [joinedEvents, setJoinedEvents] = useState<event[]>([])
    const [unjoinedEvents, setUnjoinedEvents] = useState<event[]>([])
    // const clubId = useSelector((state: RootState) => state.club.clubId);
    const { clubId } = useParams()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await ClubApiRequest.getJoinedEvent(clubId ? clubId : "")
                console.log(response)
                // Giả sử API trả về mảng các object có cấu trúc tương tự Item
                setJoinedEvents(response.payload.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await ClubApiRequest.getUnjoinedEvent(clubId ? clubId : "")
                console.log(response)
                // Giả sử API trả về mảng các object có cấu trúc tương tự Item
                setUnjoinedEvents(response.payload.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [])
    return (
        <div className='pl-6 pr-6 pt-6 space-y-4 flex flex-col h-screen overflow-auto scrollbar-hide text-[20px]'>
            {
                joinedEvents.map((event, index) => (
                    <EventCard key={index} id={event.event_id} name={event.name} description={event.description} time={event.start_time} status={event.status} />
                ))
            }
            {
                unjoinedEvents.map((event, index) => (
                    <EventCard key={index} id={event.event_id} name={event.name} description={event.description} time={event.start_time} status={event.status} />
                ))
            }
        </div>
    )
}
