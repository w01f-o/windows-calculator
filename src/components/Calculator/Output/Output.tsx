import { FC } from "react";
import { useAppSelector } from "@/hooks/redux.ts";
import { formatNumberToExp } from "@/utils/formatNumberToExp.ts";
import { formatNullToEmptyString } from "@/utils/formatNullToEmptyString.ts";

const Output: FC = () => {
  const {
    output: {
      expression: { a, b, sign },
      result,
      isFinish,
      isError,
    },
  } = useAppSelector((state) => state.calculator);

  const getResult = (): string => {
    if (b === null) {
      return `${formatNumberToExp({ number: +a!, expLimit: 8 })}`;
    } else {
      return `${formatNumberToExp({ number: +b, expLimit: 8 })}`;
    }
  };

  return result && isFinish ? (
    <div className="calculator__output">
      <div className="calculator__expression">{`${a} ${sign} ${b} =`}</div>
      <div className="calculator__result">
        {formatNumberToExp({ number: result, expLimit: 8 })}
      </div>
    </div>
  ) : (
    <div className="calculator__output">
      <div className="calculator__expression">{`
      ${a === "0" ? "" : formatNullToEmptyString(a)} 
      ${formatNullToEmptyString(sign)}
      ${formatNullToEmptyString(b)}
      `}</div>
      <div className="calculator__result">
        {isError ? "Ошибка" : getResult()}
      </div>
    </div>
  );
};

export default Output;
