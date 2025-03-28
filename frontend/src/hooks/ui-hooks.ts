import { MutableRefObject, useEffect, useState } from "react";

export const useIsScrollable = (
  elementRef: MutableRefObject<HTMLElement | null>,
): boolean => {
  const [isScrollable, setIsScrollable] = useState<boolean>(false);

  useEffect(() => {
    const checkIfScrollable = () => {
      const element = elementRef.current;
      if (element) {
        // scrollHeight > clientHeight면 스크롤 가능
        setIsScrollable(element.scrollHeight > element.clientHeight);
      }
    };

    checkIfScrollable(); // 최초 한번 체크
    window.addEventListener("resize", checkIfScrollable); // 창 크기 변화시 체크

    return () => {
      window.removeEventListener("resize", checkIfScrollable); // cleanup
    };
  }, [elementRef]);

  return isScrollable;
};
