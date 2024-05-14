import { FC } from "react";
import { useAppDispatch } from "@/hooks/redux.ts";
import { History } from "@/types/calculator.types.ts";
import { setFromHistory } from "@/store/calculator/calculatorSlice.ts";
import historyStyles from "./history.module.scss";

interface HistoryItemProps {
  element: History;
}

const HistoryItem: FC<HistoryItemProps> = ({ element }) => {
  const dispatch = useAppDispatch();

  const clickHandler = (item: History) => (): void => {
    dispatch(setFromHistory(item));
  };

  return (
    <div className={historyStyles.item} onClick={clickHandler(element)}>
      <span>{`${element.expression.a} ${element.expression.sign} ${element.expression.b} =`}</span>
      <span>{element.result}</span>
    </div>
  );
};

export default HistoryItem;
