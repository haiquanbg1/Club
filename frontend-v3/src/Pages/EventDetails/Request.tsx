import MemberCard from "@/components/MemberCard";

interface user {
    display_name: string;
    avatar: string;
    user_id: string;
}

interface users {
    members: user[]
    // setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    resetMember: () => Promise<void>;
    resetMember2: () => Promise<void>;

}

export default function Request({ members, resetMember, resetMember2 }: users) {
    return (
        <div className="p-4 rounded-xl text-[18px] mt-4 bg-[#393E46] ">
            <div className="text-[20px] font-bold">Danh sách yêu cầu</div>
            {members.map((member, idx) => (
                <MemberCard name={member.display_name} resetMember2={resetMember2} resetMember={resetMember} id={member.user_id} noMore={true} pending={true} key={idx} avatar={member.avatar} />
            ))}
            {/* <MemberCard name="Lê Trọng Khánh" pending={true} noMore={true} /> */}
        </div>
    )
}
