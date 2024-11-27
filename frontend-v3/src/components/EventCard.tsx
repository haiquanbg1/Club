import { useState } from "react"
import { Button } from "./ui/button"

interface data {
    name: string;
    time: string;
    description: string;
    id: string
}

export default function EventCard({ name = "Sự kiện vui", time = "26-11-2004", description = "Vui ơi là vui", id }: data) {
    const [joined, setJoined] = useState(false)
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
                    !joined &&
                    <Button className="ml-auto" variant={"accept"} >Tham gia</Button>

                }
                {
                    joined &&
                    <Button className="ml-auto" variant={"denied"} >Hủy đăng kí</Button>

                }
            </div>
        </div>
    )
}
