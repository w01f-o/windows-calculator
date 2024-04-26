import { FC } from "react";

const Output: FC = () => {
  return (
    <div className="calculator__output">
      <div className="calculator__expression"></div>
      <div className="calculator__result">0</div>
    </div>
  );
};

export default Output;
