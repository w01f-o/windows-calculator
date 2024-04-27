import { FC } from "react";
import { useAppSelector } from "@/hooks/redux.ts";

const Memory: FC = () => {
  const { memory } = useAppSelector((state) => state.calculator);

  return memory.length ? (
    <div className="calculator__memory-content">Память</div>
  ) : (
    <div className="calculator__memory-content">
      В памяти ничего не сохранено
    </div>
  );
};

export default Memory;
