import { FC } from "react";
import Output from "@/components/Calculator/Output/Output.tsx";
import Sidebar from "@/components/Calculator/Sidebar/Sidebar.tsx";
import MemoryControl from "@/components/Calculator/Memory/Control/MemoryControl.tsx";
import Keyboard from "@/components/Calculator/Keyboard/Keyboard.tsx";
import styles from "./calculator.module.scss";

const Calculator: FC = () => {
  return (
    <div className={styles.calculator}>
      <Output />
      <Sidebar />
      <MemoryControl />
      <Keyboard />
    </div>
  );
};

export default Calculator;
