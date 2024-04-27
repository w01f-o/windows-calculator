import { FC } from "react";
import { useAppSelector } from "@/hooks/redux.ts";
import { formatNumber } from "@/utils/formatNumber.ts";

const Output: FC = () => {
  const {
    output: {
      expression: { a, b, sign },
      result,
      isFinish,
    },
  } = useAppSelector((state) => state.calculator);

  return result && isFinish ? (
    <div className="calculator__output">
      <div className="calculator__expression">
        {b !== "" ? `${a} ${sign} ${b} =` : `${a} ${sign} ${a} =`}
      </div>
      <div className="calculator__result">{formatNumber(result, 8)}</div>
    </div>
  ) : (
    <div className="calculator__output">
      <div className="calculator__expression">
        {sign !== "" && `${a} ${sign}`}
        {sign === "" && b !== "" && `${a} ${sign} ${b}`}
      </div>
      <div className="calculator__result">
        {b === "" ? formatNumber(a, 8) : formatNumber(b, 8)}
      </div>
    </div>
  );
};

export default Output;
