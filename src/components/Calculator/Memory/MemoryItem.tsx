import Button from "@/components/UI/Button/Button.tsx";
import { FC, memo } from "react";
import memoryStyles from "./memory.module.scss";
import { Memory } from "@/types/calculator.types.ts";
import { useAppDispatch } from "@/hooks/redux.ts";
import {
  clearMemory,
  plusMinusToMemory,
} from "@/store/calculator/calculatorSlice.ts";

interface MemoryItemProps {
  value: Memory;
}

const MemoryItem: FC<MemoryItemProps> = memo(({ value }) => {
  const dispatch = useAppDispatch();

  const clickHandler = (operation: "MC" | "M+" | "M-") => (): void => {
    switch (operation) {
      case "MC":
        dispatch(clearMemory(value));
        break;

      case "M+":
        dispatch(plusMinusToMemory({ operation: "M+", memory: value }));
        break;

      case "M-":
        dispatch(plusMinusToMemory({ operation: "M-", memory: value }));
        break;
    }
  };

  return (
    <div className={memoryStyles.item}>
      <div className={memoryStyles.number}>{value.value}</div>
      <div className={memoryStyles.buttons}>
        <Button onClick={clickHandler("MC")}>MC</Button>
        <Button onClick={clickHandler("M+")}>M+</Button>
        <Button onClick={clickHandler("M-")}>M-</Button>
      </div>
    </div>
  );
});

export default MemoryItem;
