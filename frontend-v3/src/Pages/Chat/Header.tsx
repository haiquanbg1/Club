import ChatInfo from "./ChatInfo";
import { Profile } from "./index";

type HeaderProps = {
    friendProfile: Profile;
  };

export default function Header({
    friendProfile
}: HeaderProps) {
    return (
        <div className="p-3 flex align-middle border-b border-gray-300">
            <ChatInfo friendProfile={friendProfile} />
            <div className="icons">
                
            </div>
        </div>
    )
}