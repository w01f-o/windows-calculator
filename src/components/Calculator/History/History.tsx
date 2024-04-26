import { FC } from "react";
import { useAppSelector } from "../../../hooks/redux.ts";

const History: FC = () => {
  const { history } = useAppSelector((state) => state.history);

  return history.length ? (
    <div className="calculator__memory-content">Журнал</div>
  ) : (
    <div className="calculator__memory-content">Журнала ещё нет</div>
  );
};

export default History;
