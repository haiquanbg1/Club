import { UserRound, Calendar, BadgeInfo } from "lucide-react"

interface details {
    type?: string;
    time?: string;
    quantity?: number
}
function formatDate(inputDate: string) {
    const date = new Date(inputDate); // Chuyển đổi chuỗi input thành đối tượng Date

    // Lấy các thành phần ngày, tháng, năm
    const day = String(date.getDate()).padStart(2, '0'); // Đảm bảo ngày có 2 chữ số
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng từ 0 (tháng 1) đến 11 (tháng 12)
    const year = date.getFullYear();

    // Trả về chuỗi với định dạng "dd-MM-yyyy"
    return `${day}-${month}-${year}`;
}
export default function Details({ type, time, quantity }: details) {
    const timeDetail = formatDate(time ? time : "")
    return (
        <div className="p-4 rounded-xl text-[18px] mt-4 bg-[#393E46] ">
            <div className="text-[22px] font-bold mb-2">Chi tiết sự kiện</div>
            <ul className="space-y-4">
                <li className="flex">
                    <div className="flex">
                        <BadgeInfo className="mr-2" />
                        Loại sự kiện
                    </div>
                    <p>
                        {`: ${type}`}
                    </p>
                </li>
                <li className="flex">
                    <div className="flex">
                        <Calendar className="mr-2" />
                        Thời gian dự kiến
                    </div>
                    <p>
                        {`: ${timeDetail}`}
                    </p>
                </li>
                <li className="flex ">
                    <div className="flex"><UserRound className="mr-2" />
                        Số lượng thành viên tham gia
                    </div>
                    <p>
                        {`: ${quantity}`}
                    </p>

                </li>
            </ul>
        </div>
    )
}
