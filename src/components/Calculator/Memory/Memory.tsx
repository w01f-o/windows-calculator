import { FC } from "react";
import { useAppSelector } from "@/hooks/redux.ts";
import MemoryItem from "@/components/Calculator/Memory/MemoryItem.tsx";
import memoryStyles from "./memory.module.scss";

const Memory: FC = () => {
  const { memory } = useAppSelector((state) => state.calculator);

  return (
    <div className={memoryStyles.content}>
      {memory.length
        ? memory.map((item) => <MemoryItem value={item} />)
        : "В памяти ничего не сохранено"}
    </div>
  );
};

export default Memory;
