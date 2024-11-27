import EventCard from '@/components/EventCard'
import React from 'react'

export default function ListEventPage() {
    return (
        <div className='pl-6 pr-6 pt-6 space-y-4 flex flex-col h-screen overflow-auto scrollbar-hide text-[20px]'>
            <EventCard />
            <EventCard />
            <EventCard />
            <EventCard />
        </div>
    )
}
