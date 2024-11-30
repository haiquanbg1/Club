import { useState } from "react"
import { Button } from "./ui/button"
import ClubApiRequest from "@/apiRequest/club";

interface data {
    name?: string;
    time?: string;
    description?: string;
    id?: string
    status?: string
}

export default function EventCard({ name = "Sự kiện vui", time = "26-11-2004", description = "Vui ơi là vui", id = "", status }: data) {
    console.log(id)
    const joinHandle = async () => {
        try {
            const res = await ClubApiRequest.joinEvent({ event_id: id })
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='p-2 rounded-lg  pt-6 pb-6 bg-[#2b2d31] space-y-2'>
            <div>{name}</div>
            <div className="text-[14px] text-[#ccc]">
                <p>{time}</p>
            </div>
            <div>
                <p>{description}</p>
            </div>
            <div className="flex pr-2">
                {
                    status == "unjoined" &&
                    <Button className="ml-auto" variant={"accept"} onClick={joinHandle}>Tham gia</Button>

                }
                {
                    !status &&
                    <Button className="ml-auto" variant={"disable"} >Đã tham gia</Button>
                }
                {
                    status == "pending" &&
                    <Button className="ml-auto" variant={"disable"} >Đã đăng kí</Button>
                }
            </div>
        </div>
    )
}
