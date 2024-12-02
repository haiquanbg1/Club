import ChatInfo from "./ChatInfo";
import { ClubProfile } from ".";

type HeaderProps = {
    clubProfile: ClubProfile;
  };

export default function Header({
    clubProfile
}: HeaderProps) {
    return (
        <div className="p-3 flex align-middle border-b border-gray-300">
            <ChatInfo clubProfile={clubProfile}/>
            <div className="icons">
                
            </div>
        </div>
    )
}