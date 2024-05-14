import { FC } from "react";
import { useAppSelector } from "@/hooks/redux.ts";
import { History as HistoryType } from "@/types/calculator.types.ts";
import HistoryItem from "@/components/Calculator/History/HistoryItem.tsx";
import historyStyles from "./history.module.scss";

const History: FC = () => {
  const { history } = useAppSelector((state) => state.calculator);

  return (
    <div className={historyStyles.content}>
      {history.length
        ? history.map((historyElement: HistoryType) => (
            <HistoryItem element={historyElement} key={historyElement.id} />
          ))
        : "Журнала ещё нет"}
    </div>
  );
};

export default History;
