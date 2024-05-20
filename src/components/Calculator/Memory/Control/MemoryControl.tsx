import { FC } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux.ts";
import clsx from "clsx";
import {
  addToMemory,
  clearMemory,
  getFromMemory,
  plusMinusToMemory,
} from "@/store/calculator/calculatorSlice.ts";
import { memoryActionList } from "@/components/Calculator/Memory/keys/keys.ts";
import memoryStyles from "../memory.module.scss";

const MemoryControl: FC = () => {
  const { memory } = useAppSelector((state) => state.calculator);
  const dispatch = useAppDispatch();

  const clickHandler = (memoryAction: string) => (): void => {
    switch (memoryAction) {
      case "MC":
        dispatch(clearMemory());
        break;

      case "MR":
        dispatch(getFromMemory());
        break;

      case "M+":
        dispatch(plusMinusToMemory({ operation: "M+", memory: undefined }));
        break;

      case "M-":
        dispatch(plusMinusToMemory({ operation: "M-", memory: undefined }));
        break;

      case "MS":
        dispatch(addToMemory());
        break;

      default:
        break;
    }
  };

  return (
    <div className={memoryStyles.control}>
      {memoryActionList.map((action) => (
        <button
          key={action}
          className={clsx({
            [memoryStyles.button_unactive]:
              !memory.length && (action === "MC" || action === "MR"),
          })}
          disabled={!memory.length && (action === "MC" || action === "MR")}
          onClick={clickHandler(action)}
        >
          {action}
        </button>
      ))}
    </div>
  );
};

export default MemoryControl;
