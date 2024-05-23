import { FC, useMemo } from "react";
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

  const outputResult = useMemo((): string | number => {
    if (result !== null && isFinish) {
      return formatNumberToExp({ number: result, expLimit: 8 });
    } else if (!b) {
      return formatNumberToExp({ number: a ?? 0, expLimit: 8 });
    } else {
      return `${formatNumberToExp({ number: b, expLimit: 8 })}`;
    }
  }, [a, b, isFinish, result]);

  const outputExpression = useMemo((): string => {
    if (result !== null && isFinish) {
      return `${a} ${sign} ${b} =`;
    } else {
      return `${a ?? ""} ${sign ?? ""} ${b ?? ""}`;
    }
  }, [a, b, isFinish, result, sign]);

  return (
    <div className={outputStyles.output}>
      <div className={outputStyles.expression}>{outputExpression}</div>
      <div className={outputStyles.result}>
        {isError ? "Ошибка" : outputResult}
      </div>
    </div>
  );
};

export default Output;
