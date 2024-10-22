
function ClubLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex">
            <div className=" bg-red-300 min-w-[280px] h-screen">
                <h1 className="text-center">Nemui</h1>
                <div>
                    <h2>Các ban trực thuộc</h2>
                    <p>Ban chuyên môn</p>
                    <p>Ban hậu cần</p>
                    <p>Ban truyền thông</p>
                </div>
            </div>
            <div className="w-full">{children}</div>
            <div className=" bg-red-300 min-w-[280px] h-screen">
                <h1 className="text-center">Danh sách thành viên</h1>
                <div>
                    <h2>Các ban trực thuộc</h2>
                    <p>Ban chuyên môn</p>
                    <p>Ban hậu cần</p>
                    <p>Ban truyền thông</p>
                </div>
            </div>
        </div>
    );
}

export default ClubLayout;