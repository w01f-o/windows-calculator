import Button from "@/components/UI/Button/Button.tsx";
import { FC } from "react";
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

const MemoryItem: FC<MemoryItemProps> = ({ value }) => {
  const dispatch = useAppDispatch();

  return (
    <div className={memoryStyles.item}>
      <div className={memoryStyles.number}>{value.value}</div>
      <div className={memoryStyles.buttons}>
        <Button
          onClick={() => {
            dispatch(clearMemory(value));
          }}
        >
          MC
        </Button>
        <Button
          onClick={() => {
            dispatch(plusMinusToMemory({ operation: "M+", memory: value }));
          }}
        >
          M+
        </Button>
        <Button
          onClick={() => {
            dispatch(plusMinusToMemory({ operation: "M-", memory: value }));
          }}
        >
          M-
        </Button>
      </div>
    </div>
  );
};

export default MemoryItem;
