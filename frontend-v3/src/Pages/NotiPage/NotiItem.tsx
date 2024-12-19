import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface notification {
  id: string;
  title: string;
  description: string;
  status: string;
}

export default function NotiItem({
  id,
  title,
  description,
  status,
}: notification) {
  console.log(id);
  return (
    <div className="flex space-x-4 hover:bg-[#414750] p-2 rounded-xl">
      <Avatar className="w-[80px] h-[80px]">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <div className="select-none flex-1">
        <p className="font-bold capitalize text-[22px]">{title}</p>
        <span className="text-[18px]">{description}</span>
        <span>.</span>
      </div>
      {status == "no" && (
        <div className="flex items-center">
          <div className="w-5 h-5 bg-blue-500 rounded-full"></div>
        </div>
      )}
    </div>
  );
}
