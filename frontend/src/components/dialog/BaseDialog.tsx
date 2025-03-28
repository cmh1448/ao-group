import { ReactNode } from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";

interface BaseDialogProps {
  children: ReactNode;
  isOpen: boolean;
  onClose?: () => void;
}

export default function BaseDialog({
  children,
  isOpen,
  onClose,
}: BaseDialogProps) {
  return createPortal(
    <>
      <CSSTransition
        timeout={300}
        in={isOpen}
        classNames="fade"
        unmountOnExit
        mountOnEnter
      >
        <div
          className="absolute top-0 left-0 w-full h-full backdrop-blur-sm z-20 bg-black/30"
          onClick={onClose}
        />
      </CSSTransition>
      <CSSTransition
        timeout={300}
        in={isOpen}
        classNames="slide-up"
        unmountOnExit
        mountOnEnter
      >
        <div className="absolute left-0 z-30 bottom-0 w-full h-fit flex flex-col justify-end">
          <div className="w-full min-h-[30%] bg-white border border-gray-400 rounded-t-2xl shadow-xl shadow-black px-8 pt-10 pb-6">
            {children}
          </div>
        </div>
      </CSSTransition>
    </>,
    document.getElementById("root"),
  );
}
