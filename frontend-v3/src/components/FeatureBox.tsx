import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useSelector } from 'react-redux';
import { RootState } from "@/redux/store";
import { useNavigate, useParams } from "react-router-dom";
interface Feature {
    group?: string;
    names?: {
        name: string;
        event_id: string;
    }[];
    // show?: boolean
}
export default function FeatureBox({ group = "Test", names = [] }: Feature) {
    const navigate = useNavigate()
    // const clubId = useSelector((state: RootState) => state.club.clubId);
    const { clubId } = useParams()

    const [show, setShow] = useState(false)
    return (
        <div>
            <div>
                <div className="flex items-center hover:bg-slate-400 cursor-pointer select-none" onClick={() => setShow(!show)}>
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
                                <p className="text-[18px] hover:bg-slate-400 p-1 pl-6 cursor-pointer" key={idx} onClick={() => navigate(`/club/${clubId}/${name.event_id}`)}># {name.name}</p>
                            ))}
                        </div>
                    )
                }
            </div>
        </div>
    )
}
