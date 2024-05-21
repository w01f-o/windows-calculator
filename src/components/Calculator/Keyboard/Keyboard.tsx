import { FC } from "react";
import Button from "@/components/UI/Button/Button.tsx";
import { keyList } from "./keys/keys.ts";
import { useAppDispatch } from "@/hooks/redux.ts";
import { keyboardClickHandler } from "@/store/calculator/calculatorSlice.ts";
import keyboardStyles from "./keyboard.module.scss";

const Keyboard: FC = () => {
  const dispatch = useAppDispatch();

  const clickHandler = (key: string) => dispatch(keyboardClickHandler(key));

  return (
    <div className={keyboardStyles.keyboard}>
      {keyList.map((el) => (
        <Button key={el} onClick={() => clickHandler(el)}>
          {el}
        </Button>
      ))}
    </div>
  );
};

export default Keyboard;
