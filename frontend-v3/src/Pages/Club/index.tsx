import ClubHeader from "@/components/ClubHeader";
import ProfileCard from "../ClubInfo/ProfileCard";

export default function ClubPage() {

    return (
        <div>
            <ClubHeader />
            <div className='space-y-5 w-full pl-[200px] pr-[200px]'>
                <ProfileCard />
            </div>
        </div>
    )
}