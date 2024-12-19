import ChatInfo from "./ChatInfo";
import { ClubProfile } from ".";

type HeaderProps = {
    clubProfile: ClubProfile;
    conversationName: string;
  };

export default function Header({
    clubProfile,
    conversationName,
}: HeaderProps) {
    return (
        <div className="p-3 flex align-middle border-b border-gray-300">
            <ChatInfo clubProfile={clubProfile} conversationName={conversationName}/>
            <div className="icons">
                
            </div>
        </div>
    )
}