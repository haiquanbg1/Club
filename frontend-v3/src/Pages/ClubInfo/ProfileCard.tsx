
interface Club {
    name: string;
    id: string;
    avatar: string;
    description: string
}
export default function ProfileCard({ name, avatar, description }: Club) {

    return (
        <div className='rounded-md h-fit overflow-hidden flex-1 bg-[#3f3f3f]'>
            <div className='min-h-[100px] bg-[#ECDFCC] flex'>
            </div>
            <div className='flex justify-between h-[60px]'>
                <div className='flex'>
                    <div className=' translate-y-[-40px] translate-x-5 rounded-full bottom-[-40px] left-[20px] border-[8px] border-[#3f3f3f] bg-red-50 w-[100px] h-[100px]'>
                        <img className='w-full h-full object-cover rounded-full' src={avatar}></img>
                    </div>
                    <div className='translate-x-5 translate-y-[10px]'>
                        <div className='text-[18px]'>Câu lạc bộ {name}</div>
                    </div>
                </div>
            </div>
            <div className='p-[10px]'>
                <div className=' dark:bg-[#121212] min-h-[40px] rounded-[10px] p-[10px]'>
                    <div className='space-y-5 mb-[20px]'>
                        <div>
                            <div className='text-[22px] font-bold flex items-center space-x-3 text-[#ccc]'>
                                <p>Mô tả về câu lạc bộ</p>
                            </div>
                        </div>
                        <div className='text-[14px]'>{description}</div>
                    </div>
                </div>
            </div>
        </div>

    )
}
