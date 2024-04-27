import { FC } from "react";
import Button from "@/components/UI/Button/Button.tsx";
import { actionList, digitList, keyList } from "./keys.ts";
import { useAppDispatch, useAppSelector } from "@/hooks/redux.ts";
import {
  CE,
  setA,
  setB,
  setResult,
  setSign,
} from "@/store/calculator/calculatorSlice.ts";

const Keyboard: FC = () => {
  const {
    output: {
      expression: { a, b, sign },
    },
  } = useAppSelector((state) => state.calculator);
  const dispatch = useAppDispatch();

  const clickHandler = (key: string) => (): void => {
    if (digitList.includes(key)) {
      if (b === "" && sign === "") {
        dispatch(setA(key));
      } else {
        dispatch(setB(key));
      }
    }

    if (actionList.includes(key)) {
      dispatch(setSign(key));
    }

    if (key === "CE") {
      dispatch(CE());
    }

    if (key === "=") {
      dispatch(setResult(eval(`${a}${sign}${b}`)));
    }
  };

  return (
    <div className="calculator__keyboard">
      {keyList.map((el) => (
        <Button key={el} onClick={clickHandler(el)}>
          {el}
        </Button>
      ))}
    </div>
  );
};

export default Keyboard;
