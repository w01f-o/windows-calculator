import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux.ts";
import { History as HistoryType } from "@/types/calculator.types.ts";
import HistoryItem from "@/components/Calculator/History/HistoryItem.tsx";
import historyStyles from "./history.module.scss";
import { addToHistory } from "@/store/calculator/calculatorSlice.ts";

const History: FC = () => {
  const history = useAppSelector((state) => state.calculator.history);
  const result = useAppSelector((state) => state.calculator.output.result);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(addToHistory());
    // eslint-disable-next-line
  }, [result]);

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
