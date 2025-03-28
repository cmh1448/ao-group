import Button from "@/components/base/Button";
import clsx from "clsx";
import { TouchEventHandler, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { questionData } from "../data/question-data";
import Question from "@/features/applicate/components/Question.tsx";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import BaseDialog from "@/components/dialog/BaseDialog.tsx";
import { application } from "@/api";
import { useApplicationStore } from "@/stores/ApplicationStore.ts";
import { BsArrowUpRightCircle } from "react-icons/bs";

interface SurveyPanelProps {
  answers: number[];
  onChanged?: (index: number, answer: number) => void;
}

interface Location {
  X: number;
  Y: number;
}

export default function SurveyPanel({ answers, onChanged }: SurveyPanelProps) {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(0);
  const [translateAmount, setTranslateAmount] = useState("0px");
  const [lastLocationX, setLastLocationX] = useState(0);
  const [adjusting, setAdjusting] = useState(false); // 터치로 슬라이드 중인지 여부
  const [scaleSendIcon, setScaleSendIcon] = useState(false);
  const [checkDialogOpen, setCheckDialogOpen] = useState(false);

  const applicationStore = useApplicationStore();

  const handleSubmit = () => {
    application
      .submitApplication({
        studentId: applicationStore.studentId,
        name: applicationStore.name,
        applicatorType: applicationStore.applicatorType,
        surveyResponses: answers.map((answer, index) => ({
          question: "Q" + (index + 1),
          answer: answer,
        })),
      })
      .then(() => {
        navigate("/complete");
      })
      .catch(() => {
        navigate("/error");
      });
  };

  const handleTouchStart = (point: Location) => {
    setLastLocationX(point.X);
    setAdjusting(true);
  };

  const onTouchStart: TouchEventHandler<HTMLDivElement> = (e) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      handleTouchStart({ X: touch.clientX, Y: touch.clientY });
    }
  };

  const handleTouchMove = (point: Location) => {
    if (!adjusting) return;

    const diff = point.X - lastLocationX;
    setTranslateAmount(`${diff}px`);

    if (currentStep === questionData.length && diff < -100) {
      setScaleSendIcon(true);
    } else {
      setScaleSendIcon(false);
    }
  };

  const onTouchMove: TouchEventHandler<HTMLDivElement> = (e) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      handleTouchMove({ X: touch.clientX, Y: touch.clientY });
    }
  };

  const handleTouchEnd = (point: Location) => {
    if (!adjusting) return;

    const diff = point.X - lastLocationX;

    //diff threshold : 100px
    if (diff > 100) {
      if (currentStep > 1) {
        setCurrentStep(currentStep - 1);
      }
    } else if (diff < -100) {
      if (currentStep < questionData.length) {
        if (answers[currentStep - 1] !== undefined) {
          setCurrentStep(currentStep + 1);
        }
      } else {
        setCheckDialogOpen(true);
      }
    }

    setTranslateAmount("0px");
    setAdjusting(false);
    setScaleSendIcon(false);
  };

  const onTouchEnd: TouchEventHandler<HTMLDivElement> = (e) => {
    if (e.changedTouches.length === 1) {
      const touch = e.changedTouches[0];
      handleTouchEnd({ X: touch.clientX, Y: touch.clientY });
    }
  };

  return (
    <SwitchTransition>
      <CSSTransition
        key={currentStep === 0 ? "start" : "question"}
        timeout={300}
        classNames="slide"
        unmountOnExit
        mountOnEnter
      >
        <div className="h-full flex flex-col">
          {currentStep === 0 ? (
            <div className="px-8 flex-1 flex flex-col">
              <div className="text-3xl whitespace-nowrap font-semibold font-suit flex justify-center mt-24">
                어떤 스터디를 원하시나요?
              </div>
              <div className="mt-8 text-gray-500 font-suit flex justify-center text-center">
                간단한 질문 몇개만 대답 부탁드려요. <br />
                최적의 그룹을 찾아드릴게요 😊
              </div>

              <div className="flex-1" />

              <div className="mb-12">
                <Button
                  size={"large"}
                  onClick={() => {
                    setCurrentStep(1);
                  }}
                >
                  <span>시작하기</span>
                </Button>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col mt-8">
              <div className="flex gap-2 justify-center">
                {Array.from({ length: questionData.length }).map((_, index) => (
                  <div
                    key={index}
                    className={clsx(
                      `w-[24px] h-[24px] rounded-full flex items-center justify-center border-transparent border-0 transition-all`,
                      {
                        "!border-2 !border-blue-500": currentStep === index + 1,
                      },
                    )}
                  >
                    <div
                      className={clsx(
                        `w-[16px] h-[16px] rounded-full bg-gray-200`,
                        {
                          "!bg-blue-500":
                            answers[index] >= 1 && answers[index] <= 5,
                        },
                      )}
                    />
                  </div>
                ))}
              </div>
              <div className="flex flex-1 pt-12">
                {questionData.map((question, index) => (
                  <div
                    onTouchStart={onTouchStart}
                    onMouseDown={(e) => {
                      handleTouchStart({ X: e.clientX, Y: e.clientY });
                    }}
                    onTouchMove={onTouchMove}
                    onMouseMove={(e) => {
                      handleTouchMove({ X: e.clientX, Y: e.clientY });
                    }}
                    onTouchEnd={onTouchEnd}
                    onMouseUp={(e) => {
                      handleTouchEnd({ X: e.clientX, Y: e.clientY });
                    }}
                    onMouseLeave={(e) => {
                      handleTouchEnd({ X: e.clientX, Y: e.clientY });
                    }}
                    className={clsx("relative", {
                      "transition-transform duration-300": !adjusting,
                      "opacity-0 pointer-events-none":
                        index >= 1 && answers[index - 1] === undefined,
                    })}
                    style={{
                      transform: `translateX(calc(-${(currentStep - 1) * 100}% + ${translateAmount}))`,
                    }}
                  >
                    <div
                      className={`absolute h-full w-full text-gray-400 pointer-events-none`}
                    >
                      {index > 0 && (
                        <IoIosArrowBack
                          className={"absolute top-1/2 text-4xl left-8"}
                        />
                      )}

                      {index < questionData.length - 1 &&
                        answers[index] !== undefined && (
                          <IoIosArrowForward
                            className={"absolute top-1/2 text-4xl right-8"}
                          />
                        )}

                      {index === questionData.length - 1 &&
                        answers[index] !== undefined && (
                          <div
                            className={clsx(
                              "absolute top-1/2 text-4xl right-6 -translate-y-[0.5rem] transition-all rounded-full p-2",
                              {
                                "transform scale-150 bg-blue-500 text-white":
                                  scaleSendIcon,
                              },
                            )}
                          >
                            <BsArrowUpRightCircle />
                          </div>
                        )}
                    </div>
                    <Question
                      className={`w-screen h-full px-8`}
                      title={`Q${index + 1}.`}
                      question={question.question}
                      value={answers[index]}
                      left={question.left}
                      right={question.right}
                      onChange={(value) => {
                        if (onChanged) {
                          onChanged(index, value);
                        }

                        if (currentStep < questionData.length) {
                          setTimeout(() => {
                            setCurrentStep(currentStep + 1);
                          }, 100);
                        } else {
                          setCheckDialogOpen(true);
                        }
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          <BaseDialog
            isOpen={checkDialogOpen}
            onClose={() => setCheckDialogOpen(false)}
          >
            <div className={"text-2xl font-semibold text-gray-800"}>
              이대로 제출할까요?
            </div>
            <div className={"text-gray-500 mt-3"}>
              혹시 수정할 사항이 있다면 지금 다시 확인해주세요
            </div>
            <div className={"grid grid-cols-2 gap-4 mt-16"}>
              <Button
                color={"cancel"}
                onClick={() => {
                  setCheckDialogOpen(false);
                }}
              >
                한번 더 확인하기
              </Button>
              <Button
                onClick={() => {
                  setCheckDialogOpen(false);
                  setTimeout(() => {
                    handleSubmit();
                  }, 300);
                }}
              >
                제출하기
              </Button>
            </div>
          </BaseDialog>
        </div>
      </CSSTransition>
    </SwitchTransition>
  );
}
