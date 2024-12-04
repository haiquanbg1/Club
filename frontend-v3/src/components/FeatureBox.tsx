import { ChevronDown, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
interface Feature {
    group?: string;
    names?: {
        name: string;
        event_id: string;
    }[];
    // show?: boolean
    // resetName?: () => Promise<void>;
}
import { useLocation } from "react-router-dom";
export default function FeatureBox({ group = "Test", names = [] }: Feature) {
    const navigate = useNavigate()
    // const clubId = useSelector((state: RootState) => state.club.clubId);
    const { clubId, eventId } = useParams()
    const [focusEvent, setFocusEvent] = useState("")
    const location = useLocation()
    useEffect(() => {
        const regex = /^\/club\/eventDetails\/([^\/]+)\/([^\/]+)$/;
        const match = location.pathname.match(regex);
        if (match) {
            setShow(true)
            setFocusEvent(eventId || "")
        }
        else {
            setFocusEvent("")
        }
    }, [location])
    const [show, setShow] = useState(false)
    return (
        <div>
            <div>
                <div className="flex items-center hover:bg-[#393e46] cursor-pointer select-none" onClick={() => setShow(!show)}>
                    {!show && (
                        <ChevronRight />
                    )}
                    {
                        show && (
                            <ChevronDown ></ChevronDown>
                        )
                    }
                    <h1 className="text-[20px]">{group}</h1>
                </div>
                {
                    show &&
                    (
                        <div className="">
                            {names.map((name, idx) => (
                                <p className={name.event_id != focusEvent ? "text-[18px] hover:bg-[#393e46] p-1 pl-6 cursor-pointer" : "text-[18px] bg-[#393e46] p-1 pl-6 cursor-pointer"} key={idx} onClick={() => navigate(`/club/eventDetails/${clubId}/${name.event_id}`)}># {name.name}</p>
                            ))}
                        </div>
                    )
                }
            </div>
        </div>
    )
}
