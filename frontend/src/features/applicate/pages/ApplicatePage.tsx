import Logo from "@/components/Logo.tsx";
import { FormModel } from "@/features/applicate/models/form-models.ts";
import InputNamePanel from "@/features/applicate/panels/InputNamePanel.tsx";
import { useRef, useState } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { questionData } from "../data/question-data";
import SurveyPanel from "../panels/SurveyPanel";

export default function ApplicatePage() {
  const nodeRef = useRef(null);

  const [step, setStep] = useState(1);
  //이름 입력 -> 학번 입력 -> 설문조사 -> 제출
  const [form, setForm] = useState<FormModel>({
    studentInfo: {
      name: "",
      studentId: "",
    },
    survey: questionData.map((_) => undefined),
  });

  const handleStudentInfoComplete = (studentInfo: {
    name: string;
    studentId: string;
  }) => {
    setForm((prev) => ({
      ...prev,
      studentInfo,
    }));
    setStep(2);
  };

  const handleSurveyChanged = (index: number, answer: number) => {
    setForm((prev) => ({
      ...prev,
      survey: prev.survey.map((it, i) => (i === index ? answer : it)),
    }));
  };

  return (
    <div className=" py-4 h-full flex flex-col overflow-x-hidden">
      <div className="px-8 flex items-center">
        <Logo className="flex-1" />
        <div className="flex-1" />
      </div>
      <div className="flex-1 flex flex-col">
        <SwitchTransition>
          <CSSTransition timeout={300} classNames="alert" key={step}>
            <div className={"flex-1 flex flex-col"} ref={nodeRef}>
              {step === 1 ? (
                <InputNamePanel
                  className={"flex-1"}
                  onComplete={handleStudentInfoComplete}
                />
              ) : (
                <SurveyPanel
                  answers={form.survey}
                  onChanged={handleSurveyChanged}
                />
              )}
            </div>
          </CSSTransition>
        </SwitchTransition>
      </div>
    </div>
  );
}
