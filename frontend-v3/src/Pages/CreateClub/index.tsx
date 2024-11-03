import CreateClubForm from "./CreateClubForm";

export default function CreateClubPage() {
    return (
        <div className='space-y-5 w-full md:w-[50%] xl:w-[40%] 2xl:w-[30%] m-auto'>
            <h1 className='text-center font-bold text-[30px]'>Tạo câu lạc bộ của bạn</h1>
            <div className='flex justify-center'>
                <CreateClubForm />
            </div>
        </div>
    )
}