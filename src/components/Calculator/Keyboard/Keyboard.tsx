import { FC } from "react";
import Button from "../../UI/Button/Button.tsx";
import { keyList } from "./keys.ts";

const Keyboard: FC = () => {
  return (
    <div className="calculator__keyboard">
      {keyList.map((el) => (
        <Button key={el}>{el}</Button>
      ))}
    </div>
  );
};

export default Keyboard;
