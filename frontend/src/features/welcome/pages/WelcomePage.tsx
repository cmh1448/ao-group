import Button from "@/components/base/Button";
import ImpressPanel from "@/features/welcome/panels/ImpressPanel.tsx";
import IntroducePanel from "@/features/welcome/panels/IntroducePanel.tsx";
import Logo from "@/components/Logo.tsx";
import clsx from "clsx";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { FaBookReader, FaChalkboardTeacher } from "react-icons/fa";
import {
  ApplicatorType,
  useApplicationStore,
} from "@/stores/ApplicationStore.ts";
import { useIsScrollable } from "@/hooks/ui-hooks.ts";
import { css } from "@emotion/css";

const fadedEdge = css`
  --mask: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 1),
    rgba(0, 0, 0, 1) 90%,
    rgba(0, 0, 0, 0)
  );
  -webkit-mask-image: var(--mask);
  mask-image: var(--mask);
`;

export default function WelcomePage() {
  const navigate = useNavigate();
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const applicationStore = useApplicationStore();
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleMoreOpen = () => {
    setIsMoreOpen(!isMoreOpen);
  };

  const isScrollable = useIsScrollable(scrollRef);

  const handleApplicate = (type: ApplicatorType) => {
    applicationStore.setApplicatorType(type);
    navigate("/applicate");
  };

  return (
    <div className="flex px-6 py-4 relative flex-1 flex-col overflow-hidden">
      <div className={"absolute w-full h-full -z-40 blur-2xl  left-0 top-0 "}>
        <div
          className={clsx(
            "absolute  right-0 transition-all duration-700 bottom-0 w-[600px] h-[600px] bg-blue-300 rounded-full",
            {
              "-translate-x-40 scale-60": isMoreOpen,
            },
          )}
        />
        <div
          className={clsx(
            "absolute transition-all duration-700  right-0 top-0 w-[200px] h-[200px] bg-pink-200 rounded-full",
            {
              "scale-150": isMoreOpen,
            },
          )}
        />
      </div>
      <div className={"flex items-center "}>
        <Logo />
        <div className={"flex-1"} />
      </div>

      <div
        className={`flex-1 basis-0 overflow-y-scroll ${isScrollable ? `${fadedEdge} pb-6` : ""}`}
        ref={scrollRef}
      >
        <div>
          <SwitchTransition>
            <CSSTransition
              key={isMoreOpen ? "introduce" : "impress"}
              classNames={"alert"}
              timeout={300}
            >
              {isMoreOpen ? <IntroducePanel /> : <ImpressPanel />}
            </CSSTransition>
          </SwitchTransition>
        </div>
      </div>

      <div className={"w-full "}>
        <div className={"flex flex-col gap-4"}>
          <CSSTransition
            timeout={300}
            classNames={"slide-up"}
            mountOnEnter
            unmountOnExit
            in={isMoreOpen}
          >
            <div>
              <Button
                size="large"
                color={"secondary"}
                onClick={() => handleApplicate("Mentor")}
              >
                <FaChalkboardTeacher />
                멘토로 신청하기
              </Button>
            </div>
          </CSSTransition>
          <Button
            size="large"
            onClick={
              isMoreOpen ? () => handleApplicate("Mentee") : handleMoreOpen
            }
            color={isMoreOpen ? "primary" : "secondary"}
          >
            {isMoreOpen ? (
              <>
                <FaBookReader />
                멘티로 신청하기
              </>
            ) : (
              "더 알아보기"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
