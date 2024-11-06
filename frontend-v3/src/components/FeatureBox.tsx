import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

interface Feature {
    group?: string;
    names?: string[];
    // show?: boolean
}
export default function FeatureBox({ group = "Test", names = ["1", "2", "3"] }: Feature) {
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
                                <p className="text-[18px] hover:bg-slate-400 p-1 pl-6 cursor-pointer" key={idx}># {name}</p>
                            ))}
                        </div>
                    )
                }
            </div>
        </div>
    )
}
