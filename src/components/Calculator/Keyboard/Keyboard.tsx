import { FC, useEffect } from "react";
import Button from "@/components/UI/Button/Button.tsx";
import {
  basicOperationList,
  digitList,
  keyList,
  otherOperationList,
} from "./keys/keys.ts";
import { useAppDispatch, useAppSelector } from "@/hooks/redux.ts";
import {
  addToHistory,
  clearAll,
  setA,
  setB,
  setIsError,
  setIsFinish,
  addToA,
  addToB,
  setResult,
  setSign,
  clearOutput,
} from "@/store/calculator/calculatorSlice.ts";
import { v4 as uuidV4 } from "uuid";
import keyboardStyles from "./keyboard.module.scss";

const Keyboard: FC = () => {
  const {
    output: {
      expression: { a, b, sign },
      isFinish,
      result,
      isError,
    },
  } = useAppSelector((state) => state.calculator);
  const dispatch = useAppDispatch();

  const clickHandler = (key: string) => (): void => {
    isError && dispatch(clearAll());

    if (digitList.includes(key)) {
      if (b === null && sign === null) {
        dispatch(addToA(key));
      } else if (a !== null && b !== null && isFinish && result) {
        dispatch(setA(String(result)));
        dispatch(setB(key));
        dispatch(setIsFinish(false));
      } else {
        dispatch(addToB(key));
      }
    }

    if (basicOperationList.includes(key)) {
      if (isFinish) {
        dispatch(setA(String(result)));
        dispatch(setB(null));
        dispatch(setResult(null));
        dispatch(setIsFinish(false));
      }
      dispatch(setSign(key));
    }

    if (key === "CE") {
      dispatch(clearAll());
    }

    if (key === "C") {
      dispatch(clearOutput());
    }

    const updateValue = (operation: (value: number) => number | string) => {
      const checkForFinite = (num: number | string, setState: () => void) => {
        if (isFinite(+num)) {
          setState();
        } else {
          dispatch(clearAll());
          dispatch(setIsError(true));
        }
      };

      if (a !== null && b === null && result === null) {
        const tempA = operation(+a);
        checkForFinite(tempA, () => {
          dispatch(setA(String(tempA)));
        });
      } else if (a !== null && b !== null && sign !== null && result === null) {
        const tempB = operation(+b);
        checkForFinite(tempB, () => {
          dispatch(setB(String(tempB)));
        });
      } else {
        const tempResult = operation(result!);
        checkForFinite(tempResult, () => {
          dispatch(setA(String(tempResult)));
          dispatch(setB(null));
          dispatch(setResult(null));
          dispatch(setIsFinish(false));
        });
      }
    };

    if (otherOperationList.includes(key)) {
      switch (key) {
        case "%":
          updateValue((value) => value / 100);
          break;
        case "1/x":
          updateValue((value) => 1 / value);
          break;
        case "x²":
          updateValue((value) => value * value);
          break;
        case "+/-":
          updateValue((value) => value * -1);
          break;
        case "²√x":
          updateValue((value) => Math.sqrt(value));
          break;
        case "⌫":
          updateValue((value) => String(value).slice(0, -1));
          break;
        default:
          break;
      }
    }

    if (key === "=") {
      if (sign === null && !isFinish) return;

      dispatch(setIsFinish(true));

      let tempA = a as string;
      let tempB = b as string;

      if (isFinish && result !== null) {
        tempA = String(result!);
        dispatch(setA(tempA));
      }

      if (b === null) {
        tempB = a!;
        dispatch(setB(tempB));
      }

      switch (sign) {
        case "+":
          dispatch(setResult(Number(tempA) + Number(tempB)));
          break;
        case "-":
          dispatch(setResult(Number(tempA) - Number(tempB)));
          break;
        case "x":
          dispatch(setResult(Number(tempA) * Number(tempB)));
          break;
        case "/":
          if (tempB === "0") {
            dispatch(clearAll());
            dispatch(setIsError(true));
          } else {
            dispatch(setResult(Number(tempA) / Number(tempB)));
          }
          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    if (result !== null) {
      dispatch(
        addToHistory({
          result,
          expression: { a, b, sign },
          id: uuidV4(),
        }),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result]);

  return (
    <div className={keyboardStyles.keyboard}>
      {keyList.map((el) => (
        <Button key={el} onClick={clickHandler(el)}>
          {el}
        </Button>
      ))}
    </div>
  );
};

export default Keyboard;
