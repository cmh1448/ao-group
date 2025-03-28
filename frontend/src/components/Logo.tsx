import clsx from "clsx";
import { HTMLAttributes } from "react";

interface LogoProps extends HTMLAttributes<HTMLDivElement> {}

export default function Logo(props: LogoProps) {
  return (
    <div {...props} className={clsx("text-lg", props.className)}>
      <div className={"flex gap-2 items-center"}>
        <div className={"flex items-center"}>
          <span className={"font-bold"}>AO</span>
          <span className={"ml-1 font-suit translate-y-[-4px]"}>group</span>
        </div>
      </div>
    </div>
  );
}
