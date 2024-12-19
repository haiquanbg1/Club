import AdminCard from "./AdminCard"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import MemberApiRequest from "@/apiRequest/member"
import { useParams } from "react-router-dom"
import { useToast } from "@/hooks/use-toast"
interface User {
    user_id: string,
    display_name: string,
    avatar: string,
    role: string
}

export default function AdminAdd({ listAdding, setOpen, getAdmin }: { listAdding: User[], setOpen: React.Dispatch<React.SetStateAction<boolean>>, getAdmin: () => Promise<void> }) {
    const { toast } = useToast()
    const [selected, setSelected] = useState("")
    const { clubId } = useParams()
    const handleSelect = (id: string) => {
        if (id == selected) {
            setSelected("")
        }
        else {
            setSelected(id)
        }
    }

    const handleAdd = async () => {
        const body = {
            club_id: clubId,
            user_id: selected
        }
        try {
            const res = await MemberApiRequest.addAdmin(body)
            setOpen(false)
            getAdmin()
            toast({
                title: "Thành công",
                description: res.payload.message,
            })
        } catch (error) {

        }
    }
    return (
        <div className="p-2 overflow-auto">

            <>
                <h1 className="text-[24px] mb-2 text-white font-bold">Bạn bè</h1>

                <div className="p-2 text-[16px] space-y-2">

                    {
                        listAdding.map((friend, index) => (
                            <div key={index} onClick={() => handleSelect(friend.user_id)}
                                className={`p-1 rounded-sm cursor-pointer ${selected == friend.user_id ? 'bg-slate-300' : ''}`}
                            >
                                <AdminCard noMore={true} display_name={friend.display_name} user_id={friend.user_id} avatar={friend.avatar}></AdminCard>
                            </div>
                        ))

                    }

                </div>
                <div className="flex">
                    <Button className="ml-auto" variant={"accept"} onClick={handleAdd}>Thêm thành viên</Button>

                </div>
            </>
        </div>
    )
}
