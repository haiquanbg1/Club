import MemberCard from "@/components/MemberCard";

interface user {
    display_name: string;
    avatar: string
}

interface users {
    members: user[]
}

export default function Request({ members }: users) {
    return (
        <div className="p-4 rounded-xl text-[18px] mt-4 bg-[#393E46] ">
            <div className="text-[20px] font-bold">Danh sách yêu cầu</div>
            {members.map((member, idx) => (
                <MemberCard name={member.display_name} noMore={true} pending={true} key={idx} avatar={member.avatar} />
            ))}
            {/* <MemberCard name="Lê Trọng Khánh" pending={true} noMore={true} /> */}
        </div>
    )
}
