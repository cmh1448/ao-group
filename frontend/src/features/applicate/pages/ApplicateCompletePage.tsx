import Button from "@/components/base/Button";
import Logo from "@/components/Logo";
import { useNavigate } from "react-router-dom";

export default function ApplicateCompletePage() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };
  return (
    <div className="h-full flex items-center relative justify-center flex-col">
      <div className="flex items-center justify-center">
        <Logo className="!text-2xl" />
      </div>
      <div className="flex justify-center my-12">
        <div className="h-px bg-gray-500 w-32" />
      </div>
      <div className="flex flex-col items-center gap-4 justify-center pb-20">
        {/*<FaCheck className="text-4xl text-blue-500" />*/}
        <div className="text-2xl font-semibold flex flex-col items-center">
          신청이 완료되었습니다.
          <span className="text-gray-400 text-sm font-normal mt-2">
            결과 발표시까지 조금만 기다려주세요.
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
