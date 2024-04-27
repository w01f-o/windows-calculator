import { FC } from "react";
import { useAppSelector } from "@/hooks/redux.ts";

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
      <div className="calculator__result">{result}</div>
    </div>
  ) : (
    <div className="calculator__output">
      <div className="calculator__expression">
        {sign !== "" && `${a} ${sign}`}
        {sign === "" && b !== "" && `${a} ${sign} ${b}`}
      </div>
      <div className="calculator__result">{b === "" ? a : b}</div>
    </div>
  );
};

export default Output;
