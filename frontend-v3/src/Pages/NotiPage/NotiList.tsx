

export default function NotiList() {
    return (
        <div className="bg-[#393e46] flex flex-col overflow-auto rounded-lg w-full p-4 lg:w-[65%] md:w-[70%] xl:w-[60%] ml-auto mr-auto">
            <div>
                <h1 className="text-[24px] font-bold">Thông báo</h1>
            </div>
            <div className="flex space-x-6 mt-4">
                <h2 className="text-[18px] ">Tất cả</h2>
                <h2 className="text-[18px] ">Chưa đọc</h2>
            </div>

        </div>
    )
}
