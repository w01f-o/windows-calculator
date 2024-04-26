import { FC } from "react";

const Output: FC = () => {
  return (
    <div className="calculator__output">
      <div className="calculator__expression">5+5=</div>
      <div className="calculator__result">10</div>
    </div>
  );
};

export default Output;
