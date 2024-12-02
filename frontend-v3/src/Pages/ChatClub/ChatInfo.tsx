import { ClubProfile } from '.';
import Avatar from '../Chat/Avatar';

type Props = {
    clubProfile: ClubProfile;
};


export default function ChatInfo({clubProfile} : Props) {
 
    return (
        <div className='flex hover:shadow-lg p-1 rounded cursor-pointer'>
            <Avatar
                    size='lg'
                    name={clubProfile.id}
                    imgSrc='/images/thang.png'
                />
            <div className='ml-3 justify-center align-middle'>
                <span>{clubProfile.description}</span>
                <p className='text-sm font-medium text-gray-500'>{clubProfile.id}</p>
            </div>
        </div>
    )
}