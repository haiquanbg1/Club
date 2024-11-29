import EventCard from '@/components/EventCard'
import { GetEventResType } from '@/schemaValidations/event.schema'
import React, { useEffect, useState } from 'react'
import ClubApiRequest from '@/apiRequest/club'
import { UseDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

interface event {
    date: string;
    name: string;
    description: string;
    event_id: string;
};
export default function ListEventPage() {
    const [events, setEvents] = useState<event[]>([])
    const clubId = useSelector((state: RootState) => state.club.clubId);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await ClubApiRequest.getEvent(clubId ? clubId : "")
                console.log(response)
                // Giả sử API trả về mảng các object có cấu trúc tương tự Item
                setEvents(response.payload.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [])
    return (
        <div className='pl-6 pr-6 pt-6 space-y-4 flex flex-col h-screen overflow-auto scrollbar-hide text-[20px]'>
            {
                events.map((event, index) => (
                    <EventCard key={index} id={event.event_id} name={event.name} description={event.description} time={event.date} />
                ))
            }
        </div>
    )
}
