import clsx from "clsx";
import { HTMLAttributes } from "react";
import { BiCheck } from "react-icons/bi";

interface QuestionProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  left?: string;
  right?: string;
  title: string;
  question: string;
  value?: number;
  onChange?: (value: number) => void;
}

export default function Question({
  title,
  question,
  value,
  left,
  right,
  onChange,
  ...props
}: QuestionProps) {
  const handleSelect = (value: number) => {
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div {...props} className={clsx("flex flex-col", props.className)}>
      <div className="">
        <div className="text-3xl text-blue-500 font-bold font-suit">
          {title}
        </div>
        <div className="text mt-4 break-keep">{question}</div>
      </div>
      <div className="flex-1" />
      <div className="flex items-center justify-center pt-6 px-4 gap-3 text-gray-600">
        <div className="col-span-1 text-center text-[14px] flex items-center justify-center">
          {left}
        </div>
        <div className="col-span-3 h-[1px] bg-gray-300 flex-1"></div>
        <div className="col-span-1 text-center text-[14px] flex items-center justify-center">
          {right}
        </div>
      </div>
      <div className="flex justify-between px-4 pt-6 mb-12">
        {[1, 2, 3, 4, 5].map((it) => (
          <div
            className="flex flex-col gap-3 items-center justify-center"
            key={it}
          >
            <div
              className={clsx(
                "bg-gray-200 w-[3.5rem] h-[3.5rem] flex items-center justify-center rounded-full border border-gray-300 cursor-pointer active:scale-95 transition-all",
                {
                  "!bg-blue-500 border-transparent text-white font-bold text-2xl shadow-blue-500 ring-8":
                    value === it,
                  "!w-[2.6rem] !h-[2.6rem]": it === 3,
                  "!w-[3rem] !h-[3rem]": it === 2 || it === 4,
                },
              )}
              onClick={() => handleSelect(it)}
            >
              {value === it ? (
                <BiCheck className="text-white" />
              ) : (
                <>
                  <div className="bg-gray-300 w-2 h-2 rounded-full" />
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
