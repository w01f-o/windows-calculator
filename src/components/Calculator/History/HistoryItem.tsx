import { CSSTransition } from "react-transition-group";
import { FC, useRef } from "react";
import { useAppDispatch } from "@/hooks/redux.ts";
import { History } from "@/types/calculator.types.ts";
import { setFromHistory } from "@/store/calculator/calculatorSlice.ts";

interface HistoryItemProps {
  element: History;
}

const HistoryItem: FC<HistoryItemProps> = ({ element }) => {
  const dispatch = useAppDispatch();
  const nodeRef = useRef(null);

  const clickHandler = (item: History) => (): void => {
    dispatch(setFromHistory(item));
  };

  return (
    <CSSTransition
      key={element.id}
      timeout={500}
      classNames="history-item"
      nodeRef={nodeRef}
    >
      <div
        className="calculator__history-item"
        onClick={clickHandler(element)}
        ref={nodeRef}
      >
        <span>{`${element.expression.a} ${element.expression.sign} ${element.expression.b} =`}</span>
        <span>{element.result}</span>
      </div>
    </CSSTransition>
  );
};

export default HistoryItem;
