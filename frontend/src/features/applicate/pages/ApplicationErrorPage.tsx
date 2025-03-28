import Button from "@/components/base/Button";
import { useNavigate } from "react-router-dom";
import { TbMoodCry } from "react-icons/tb";

export default function ApplicationErrorPage() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="h-full flex items-center relative justify-center flex-col">
      <div className="flex flex-col items-center gap-4 justify-center pb-20">
        <TbMoodCry className={"text-4xl"} />
        <div className="text-2xl font-semibold flex flex-col items-center">
          신청을 하는 중 오류가 발생했어요
          <span className="text-gray-400 text-sm font-normal mt-6 text-center">
            문제가 지속된다면 스터디 회장에게 문의해주세요
          </span>
        </div>
      </div>
      <div className="absolute bottom-10 w-full flex items-center justify-center">
        <Button
          size={"large"}
          color={"secondary"}
          className="mx-6 w-full"
          onClick={handleGoHome}
        >
          처음으로 돌아가기
        </Button>
      </div>
    </div>
  );
}
