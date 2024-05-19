import Button from "@/components/UI/Button/Button.tsx";
import { FC } from "react";
import memoryStyles from "./memory.module.scss";
import { Memory } from "@/types/calculator.types.ts";

interface MemoryItemProps {
  value: Memory;
}

const MemoryItem: FC<MemoryItemProps> = ({ value }) => {
  return (
    <div className={memoryStyles.item}>
      <div className={memoryStyles.number}>{value.value}</div>
      <div className={memoryStyles.buttons}>
        <Button>MC</Button>
        <Button>M+</Button>
        <Button>M-</Button>
      </div>
    </div>
  );
};

export default MemoryItem;
