import ProfileCard from './ProfileCard'
import Password from './PassWord'
import Account from './Account'
import ChangeAvatar from './ChangeAvatar'
import userApiRequest from '@/apiRequest/userProfile'
import { useEffect, useState } from 'react'
import { useToast } from '@/hooks/use-toast'
// import { useNavigate } from 'react-router-dom'
import { UserProfileResType } from '@/schemaValidations/profile.schema'
import { useLocation } from 'react-router-dom'
export default function UserProfilePage() {
    const { toast } = useToast()
    const [info, setInfo] = useState<UserProfileResType>()
    // const { userId } = useParams()
    const location = useLocation()
    // Trích xuất query string từ location.search
    const queryParams = new URLSearchParams(location.search);

    // Lấy giá trị của userId từ query string
    const userId = queryParams.get('userId');
    // console.log(userId)

    const [check, setCheck] = useState(localStorage.getItem("user_id") == userId || !userId)

    useEffect(() => {
        setCheck(localStorage.getItem("user_id") == userId || !userId)
    }, [location])
    const getInfo = async () => {
        try {
            const result = await userApiRequest.getProfile(userId || "")
            setInfo(result?.payload)

        } catch (error: any) {

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
        , [location])
    return (
        <div className='space-y-5 w-full md:w-[50%] xl:w-[40%] 2xl:w-[30%] m-auto bg-[#2b2d31]'>
            <h3 className='text-[20px]'>Tài khoản của tôi</h3>
            <ProfileCard check={check} resetInfo={getInfo} id={info?.data.id || ""} display_name={info?.data.display_name || ""} email={info?.data.email || ""} avatar={info?.data.avatar || ""} birthday={info?.data.birthday || ""} gender={info?.data.gender || true} />
            {
                check &&
                <>
                    <Password />
                    <Account />
                    <ChangeAvatar resetInfo={getInfo} />
                </>
            }

        </div>
    )
}
