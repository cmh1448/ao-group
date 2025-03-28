import Button from "@/components/base/Button.tsx";
import Input from "@/components/base/Input.tsx";
import BaseDialog from "@/components/dialog/BaseDialog";
import clsx from "clsx";
import { HTMLAttributes, useEffect, useState } from "react";
import { GoChecklist } from "react-icons/go";
import { useApplicationStore } from "@/stores/ApplicationStore.ts";
import { useNavigate } from "react-router-dom";

interface OnCompleteEventArgs {
  name: string;
  studentId: string;
}

interface InputNamePanelProps extends HTMLAttributes<HTMLDivElement> {
  onComplete?: (args: OnCompleteEventArgs) => void;
}

export default function InputNamePanel(props: InputNamePanelProps) {
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [nameError, setNameError] = useState<string>();
  const [studentIdError, setStudentIdError] = useState<string>();

  const [checkDialogOpen, setCheckDialogOpen] = useState(false);
  const applicationStore = useApplicationStore();
  const navigate = useNavigate();

  const handelComplete = () => {
    let isError = false;
    if (!name) {
      setNameError("이름을 입력해주세요");
      isError = true;
    }
    if (!studentId) {
      setStudentIdError("학번을 입력해주세요");
      isError = true;
    }
    if (isError) {
      return;
    }

    if (props.onComplete) {
      setNameError(undefined);
      setStudentIdError(undefined);
      setCheckDialogOpen(true);
    }
  };

  useEffect(() => {
    if (!applicationStore.applicatorType) {
      navigate("/");
    }
  }, []);

  return (
    <div
      {...props}
      className={clsx("mt-12 px-8 flex flex-col h-full", props.className)}
    >
      <div className="font-semibold text-2xl">이름과 학번을 입력해주세요</div>
      <Input
        label={"이름"}
        className={"mt-12"}
        placeholder={
          applicationStore.applicatorType === "Mentor" ? "김멘토" : "김멘티"
        }
        error={nameError}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        label={"학번"}
        className={"mt-8"}
        placeholder={"602xxxxx"}
        error={studentIdError}
        onChange={(e) => setStudentId(e.target.value)}
      />
      <div className={"flex-1"} />
      <Button className={"mt-12 mb-6"} size={"large"} onClick={handelComplete}>
        다음
      </Button>

      <BaseDialog
        isOpen={checkDialogOpen}
        onClose={() => setCheckDialogOpen(false)}
      >
        <div className="text-[22px] font-semibold text-gray-800 flex gap-2 items-center font-suit">
          <GoChecklist />
          이름과 학번을 확인해주세요
        </div>
        <div className={"mt-5"}>
          <div>
            <div
              className={
                "text-blue-600 text-xl font-semibold w-fit bg-gray-100 p-1 rounded-lg"
              }
            >
              {name}
            </div>
            <div className={"mt-1"}>님의 학번이</div>
          </div>
          <div
            className={
              "text-blue-600 text-xl font-semibold mt-6 bg-gray-100 p-1 rounded-lg w-fit"
            }
          >
            {studentId}
          </div>
          <div className={"mt-1"}>인가요?</div>
          <div className={"grid grid-cols-2 gap-4 mt-6"}>
            <Button onClick={() => setCheckDialogOpen(false)} color={"cancel"}>
              취소
            </Button>
            <Button
              onClick={() => {
                setCheckDialogOpen(false);
                applicationStore.setStudentId(studentId);
                applicationStore.setName(name);
                setTimeout(() => {
                  props.onComplete?.({ name, studentId });
                }, 300);
              }}
            >
              확인하고 넘어가기
            </Button>
          </div>
        </div>
      </BaseDialog>
    </div>
  );
}
