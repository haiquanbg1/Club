import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


interface notification {
    id: string,
    title: string,
    description: string,
    status: string
}

export default function NotiItem({ id, title, description, status }: notification) {
    return (
        <div className="flex space-x-4">
            <Avatar className="w-[80px] h-[80px]">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <div className="text-[20px]">
                <span className="font-bold capitalize">{title}</span>
                <span> </span>
                <span>{description}</span>
                <span>.</span>
            </div>
        </div>
    )
}
