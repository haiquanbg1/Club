import ProfileCard from './ProfileCard'
import Password from './PassWord'
import Account from './Account'
import ChangeAvatar from './ChangeAvatar'
import userApiRequest from '@/apiRequest/userProfile'
import { useEffect, useState } from 'react'
import { useToast } from '@/hooks/use-toast'
// import { useNavigate } from 'react-router-dom'
import { UserProfileResType } from '@/schemaValidations/profile.schema'
export default function UserProfilePage() {
    const { toast } = useToast()
    const [info, setInfo] = useState<UserProfileResType>()
    const getInfo = async () => {
        try {
            const result = await userApiRequest.getProfile("")
            setInfo(result?.payload)
            console.log(result?.payload)
        } catch (error: any) {
            console.log(error.payload)
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
            })

        }
    }
    useEffect(() => {
        getInfo()
    }
        , [])
    return (
        <div className='space-y-5 w-full md:w-[50%] xl:w-[40%] 2xl:w-[30%] m-auto'>
            <h3 className='text-[20px]'>Tài khoản của tôi</h3>
            <ProfileCard resetInfo={getInfo} id={info?.data.id || ""} display_name={info?.data.display_name || ""} email={info?.data.email || ""} avatar={info?.data.avatar || ""} birthday={info?.data.birthday || ""} gender={info?.data.gender || 0} />
            <Password />
            <Account />
            <ChangeAvatar resetInfo={getInfo} />
        </div>
    )
}
