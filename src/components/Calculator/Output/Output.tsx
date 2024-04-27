import { FC } from "react";
import { useAppSelector } from "@hooks/redux.ts";

const Output: FC = () => {
  const {
    output: {
      expression: { a, b, sign },
      result,
    },
  } = useAppSelector((state) => state.calculator);

  return result ? (
    <div className="calculator__output">
      <div className="calculator__expression">{`${a} ${sign} ${b} =`}</div>
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
