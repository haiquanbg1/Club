import { Button } from "./ui/button";
import { useNavigate, useParams } from "react-router-dom";

export default function ClubHeader() {
  const navigate = useNavigate();
  const { clubId } = useParams();
  const handleCLick = () => {
    const arr = localStorage.getItem("adminClubs");
    if (arr?.includes(clubId || "")) {
      navigate(`/reportList/${clubId}`);
    } else {
      navigate(`/report/${clubId}`);
    }
  };
  return (
    <div className="w-full  bg-[#3d3f46] p-2 flex justify-between items-center">
      <Button
        onClick={handleCLick}
        className="ml-auto bg-[#fffafaa2] text-[white] text-sm hover:bg-[#fffafa75]"
      >
        Báo cáo
      </Button>
    </div>
  );
}
