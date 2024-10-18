import ProfileCard from './ProfileCard'
import Password from './PassWord'
import Account from './Account'
import ChangeAvatar from './ChangeAvatar'
export default function UserProfilePage() {

    return (
        <div className='space-y-5 w-full md:w-[50%] xl:w-[40%] 2xl:w-[30%] m-auto'>
            <h3 className='text-[20px]'>Tài khoản của tôi</h3>


            <ProfileCard />
            <Password />
            <Account />
            <ChangeAvatar />
        </div>
    )
}
