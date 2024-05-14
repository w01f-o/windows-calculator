import Button from "@/components/UI/Button/Button.tsx";
import { FC } from "react";
import memoryStyles from "./memory.module.scss";

interface MemoryItemProps {
  value: number;
}

const MemoryItem: FC<MemoryItemProps> = ({ value }) => {
  return (
    <div className={memoryStyles.item}>
      <div className={memoryStyles.number}>{value}</div>
      <div className={memoryStyles.buttons}>
        <Button>MC</Button>
        <Button>M+</Button>
        <Button>M-</Button>
      </div>
    </div>
  );
};

export default MemoryItem;
