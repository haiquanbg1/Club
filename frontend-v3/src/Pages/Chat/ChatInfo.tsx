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
                    name={friendProfile.id}
                    imgSrc='/images/thang.png'
                />
            <div className='ml-3 justify-center align-middle'>
                <span>{friendProfile.display_name}</span>
                <p className='text-sm font-medium text-gray-500'>{friendProfile.id}</p>
            </div>
        </div>
    )
}