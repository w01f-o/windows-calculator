import { FC } from "react";
import { useAppSelector } from "@/hooks/redux.ts";
import outputStyles from "./output.module.scss";
import { formatNumberToExp } from "@/utils/formatNumberToExp.ts";

const Output: FC = () => {
  const {
    output: {
      expression: { a, b, sign },
      result,
      isFinish,
      isError,
    },
  } = useAppSelector((state) => state.calculator);

  const getResult = (): string | number => {
    if (result && isFinish) {
      return formatNumberToExp({ number: result, expLimit: 8 });
    } else if (b === null) {
      return `${formatNumberToExp({ number: +a!, expLimit: 8 })}`;
    } else {
      return `${formatNumberToExp({ number: +b, expLimit: 8 })}`;
    }
  };

  const getExpression = (): string => {
    if (result && isFinish) {
      return `${a} ${sign} ${b} =`;
    } else {
      return `${a === "0" ? "" : a ?? ""}${sign ?? ""}${b ?? ""}`;
    }
  };

  return (
    <div className={outputStyles.output}>
      <div className={outputStyles.expression}>{getExpression()}</div>
      <div className={outputStyles.result}>
        {isError ? "Ошибка" : getResult()}
      </div>
    </div>
  );
};

export default Output;
