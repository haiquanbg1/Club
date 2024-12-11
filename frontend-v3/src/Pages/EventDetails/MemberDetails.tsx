import MemberCard from "@/components/MemberCard"


interface user {
    display_name: string;
    avatar: string;
    user_id: string;
}

interface users {
    members: user[];
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    resetMember: () => Promise<void>;

}


export default function MemberDetails({ members, setOpen, resetMember }: users) {

    return (
        <div className="p-4 rounded-xl text-[18px] mt-4 bg-[#393E46] space-y-2 ">
            <div className="space-y-4">
                {members.map((member, idx) => (
                    <MemberCard name={member.display_name} setOpen={setOpen} resetMember={resetMember} id={member.user_id} noMore={true} event={true} key={idx} avatar={member.avatar} />
                ))}
            </div>
        </div>
    )
}
