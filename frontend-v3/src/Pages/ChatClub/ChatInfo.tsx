import { ClubProfile } from '.';
import Avatar from '../Chat/Avatar';

type Props = {
    clubProfile: ClubProfile;
    conversationName: string;
};


export default function ChatInfo({clubProfile, conversationName} : Props) {
 
    return (
        <div className='flex hover:shadow-lg p-1 rounded cursor-pointer'>
            <Avatar
                    size='lg'
                    name={clubProfile.name}
                    imgSrc={clubProfile.avatar}
                    orientation='left'
                />
            <div className='ml-3 justify-center align-middle'>
                <span>{conversationName}</span>
                <p className='text-sm font-medium text-gray-500'>{clubProfile.description}</p>
            </div>
        </div>
    )
}