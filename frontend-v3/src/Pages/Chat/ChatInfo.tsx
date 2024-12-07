import { Profile } from '.';
import Avatar from './Avatar';

type Props = {
    friendProfile: Profile
};


export default function ChatInfo({friendProfile} : Props) {
 
    return (
        <div className='flex hover:shadow-lg p-1 rounded cursor-pointer'>
            <Avatar
                    size='lg'
                    name={friendProfile.display_name}
                    imgSrc={friendProfile.avatar}
                    orientation='left'
                />
            <div className='ml-3 justify-center align-middle'>
                <span>{friendProfile.display_name}</span>
                <p className='text-sm font-medium text-gray-500'>{friendProfile.display_name}</p>
            </div>
        </div>
    )
}