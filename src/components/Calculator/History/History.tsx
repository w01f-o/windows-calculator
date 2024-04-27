import { FC } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux.ts";
import { History as IHistory } from "@/types/calculator.types.ts";
import { setFromHistory } from "@/store/calculator/calculatorSlice.ts";

const History: FC = () => {
  const { history } = useAppSelector((state) => state.calculator);
  const dispatch = useAppDispatch();

  const clickHandler = (item: IHistory) => (): void => {
    dispatch(setFromHistory(item));
  };

  return history.length ? (
    <div className="calculator__history-content">
      {history.map((item: IHistory) => (
        <div
          className="calculator__history-item"
          key={item.id}
          onClick={clickHandler(item)}
        >
          <span>{`${item.expression.a} ${item.expression.sign} ${item.expression.b} =`}</span>
          <span>{item.result}</span>
        </div>
      ))}
    </div>
  ) : (
    <div className="calculator__history-content">Журнала ещё нет</div>
  );
};

export default History;
