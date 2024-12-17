import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


interface notification {
    id: string,
    title: string,
    description: string,

}

export default function NotiItem({ id, title, description }: notification) {
    console.log(id)
    return (
        <div className="flex space-x-4 hover:bg-[#414750] p-2 rounded-xl">
            <Avatar className="w-[80px] h-[80px]">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <div className="select-none ">
                <p className="font-bold capitalize text-[22px]">{title}</p>
                <span className="text-[18px]">{description}</span>
                <span>.</span>
            </div>
        </div>
    )
}
