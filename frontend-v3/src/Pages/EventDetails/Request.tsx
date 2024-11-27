import MemberCard from "@/components/MemberCard";


export default function Request() {
    return (
        <div className="p-4 rounded-xl text-[18px] mt-4 bg-[#393E46] ">
            <div className="text-[20px] font-bold">Danh sách yêu cầu</div>
            <MemberCard name="Lê Trọng Khánh" pending={true} noMore={true} />
        </div>
    )
}
