import { createRef, FC, useEffect } from "react";
import Button from "@/components/UI/Button/Button.tsx";
import { actionList, digitList, keyList } from "./keys.ts";
import { useAppDispatch, useAppSelector } from "@/hooks/redux.ts";
import {
  addToHistory,
  CE,
  setFixedA,
  setFixedB,
  setIsFinish,
  setPlusA,
  setPlusB,
  setResult,
  setSign,
} from "@/store/calculator/calculatorSlice.ts";
import { v4 as uuidV4 } from "uuid";

const Keyboard: FC = () => {
  const {
    output: {
      expression: { a, b, sign },
      isFinish,
      result,
    },
  } = useAppSelector((state) => state.calculator);
  const dispatch = useAppDispatch();

  const clickHandler = (key: string) => (): void => {
    if (digitList.includes(key)) {
      if (b === "" && sign === "") {
        dispatch(setPlusA(key));
      } else if (a !== "" && b !== "" && isFinish) {
        dispatch(setFixedA(result));
        dispatch(setFixedB(key));
        dispatch(setIsFinish(false));
      } else {
        dispatch(setPlusB(key));
      }
    }

    if (actionList.includes(key)) {
      if (isFinish) {
        dispatch(setFixedA(result));
        dispatch(setFixedB(""));
        dispatch(setIsFinish(false));
      }
      dispatch(setSign(key));
    }

    if (key === "CE") {
      dispatch(CE());
    }

    if (key === "=") {
      if (sign === "" && !isFinish) return;

      dispatch(setIsFinish(true));

      let tempA = a;
      let tempB = b;

      if (isFinish && result !== "") {
        tempA = result;
        dispatch(setFixedA(tempA));
      }

      if (b === "") {
        tempB = a;
        dispatch(setFixedB(tempB));
      }

      switch (sign) {
        case "+":
          dispatch(setResult(`${+tempA + +tempB}`));
          break;

        case "-":
          dispatch(setResult(`${+tempA - +tempB}`));
          break;

        case "x":
          dispatch(setResult(`${+tempA * +tempB}`));
          break;

        case "/":
          if (tempB === "0") {
            dispatch(CE());
            dispatch(setFixedA("Ошибка"));
          } else {
            dispatch(setResult(`${+tempA / +tempB}`));
          }
          break;

        default:
          break;
      }
    }
  };

  useEffect(() => {
    if (result !== "") {
      dispatch(
        addToHistory({
          result,
          expression: { a, b: b !== "" ? b : a, sign },
          id: uuidV4(),
          nodeRef: createRef(),
        }),
      );
    }
    // eslint-disable-next-line
  }, [result]);

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
