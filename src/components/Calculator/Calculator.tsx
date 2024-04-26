import "./Calculator.scss";
import { FC } from "react";
import Keyboard from "./Keyboard/Keyboard.tsx";
import Sidebar from "./Sidebar/Sidebar.tsx";
import Output from "./Output/Output.tsx";
import MemoryControl from "./Memory/Control/MemoryControl.tsx";

const Calculator: FC = () => {
  return (
    <div className="calculator">
      <Output />
      <Sidebar />
      <MemoryControl />
      <Keyboard />
    </div>
  );
};

export default Calculator;
