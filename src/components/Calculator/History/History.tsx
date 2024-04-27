import { FC } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux.ts";
import { History as IHistory } from "@/types/calculator.types.ts";
import { setFromHistory } from "@/store/calculator/calculatorSlice.ts";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const History: FC = () => {
  const { history } = useAppSelector((state) => state.calculator);
  const dispatch = useAppDispatch();

  const clickHandler = (item: IHistory) => (): void => {
    dispatch(setFromHistory(item));
  };

  return history.length > 0 ? (
    <div className="calculator__history-content">
      <TransitionGroup>
        {history.map((item: IHistory) => (
          <CSSTransition
            key={item.id}
            timeout={200}
            classNames="history-item"
            // nodeRef={item.nodeRef}
          >
            <div
              className="calculator__history-item"
              onClick={clickHandler(item)}
              // ref={item.nodeRef}
            >
              <span>{`${item.expression.a} ${item.expression.sign} ${item.expression.b} =`}</span>
              <span>{item.result}</span>
            </div>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  ) : (
    <div className="calculator__history-content">Журнала ещё нет</div>
  );
};

export default History;
