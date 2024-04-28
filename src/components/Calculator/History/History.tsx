import { FC } from "react";
import { useAppSelector } from "@/hooks/redux.ts";
import { History as HistoryType } from "@/types/calculator.types.ts";
import { TransitionGroup } from "react-transition-group";
import HistoryItem from "@/components/Calculator/History/HistoryItem.tsx";

const History: FC = () => {
  const { history } = useAppSelector((state) => state.calculator);

  return history.length > 0 ? (
    <TransitionGroup className="calculator__history-content">
      {history.map((historyElement: HistoryType) => (
        <HistoryItem element={historyElement} key={historyElement.id} />
      ))}
    </TransitionGroup>
  ) : (
    <div className="calculator__history-content">Журнала ещё нет</div>
  );
};

export default History;
