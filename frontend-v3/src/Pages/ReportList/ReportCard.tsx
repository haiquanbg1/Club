import ReportApiRequest from "@/apiRequest/report";

import { CheckCircle2, X } from "lucide-react";
interface report {
    id: string;
    title: string;
    message: string;
    status: string;
    reset: () => Promise<void>;
}
export default function ReportCard({ id, title, message, status, reset }: report) {

    const handelUpdate = async () => {
        try {
            const body = {
                report_id: id,
                status: "read"
            }
            await ReportApiRequest.update(body)

            reset()
        } catch (error) {

        }
    }

    const handelDelete = async () => {
        try {
            const body = {
                report_id: id,
            }
            await ReportApiRequest.delete(body)
            reset()
        } catch (error) {

        }
    }
    return (
        <div className="h-20 w-full bg-[#313338] flex justify-between items-center p-2 rounded-lg">
            {
                status == 'pending' &&
                (
                    <>
                        <div>
                            <div className="flex space-x-2 items-center">
                                <h1 className="text-[22px] font-bold capitalize">{title}</h1>

                            </div>
                            <p>{message}</p>
                        </div>
                        <div onClick={handelUpdate} className="h-[40px] w-[40px] transition duration-200 cursor-pointer  border-2 border-[#4a5158] rounded-full checked:bg-[#4a5158] checked:border-[#4a5158] focus:outline-none">
                        </div>
                    </>
                )
            }

            {
                status != 'pending' &&
                (
                    <>
                        <div>
                            <div className="flex space-x-2 items-center">
                                <h1 className="text-[22px] text-[#cccccc5d] font-bold line-through capitalize">{title}</h1>
                            </div>
                            <p className="text-[#cccccc5d] line-through">{message}</p>
                        </div>
                        <div className="flex">
                            <CheckCircle2 color="green" size={40} />
                            <X size={16} onClick={handelDelete} color="#ccc" className="cursor-pointer translate-y-[-80%] translate-x-[40%]" />
                        </div>
                    </>
                )
            }
        </div>

    )
}
