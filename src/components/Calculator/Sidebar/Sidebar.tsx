import { FC, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import History from "@/components/Calculator/History/History.tsx";
import Memory from "@/components/Calculator/Memory/Memory.tsx";
import { useAppSelector } from "@/hooks/redux.ts";
import sidebarStyles from "./sidebar.module.scss";

enum CalculatorTabsEnum {
  memory,
  history,
}

const Sidebar: FC = () => {
  const [currentTab, setCurrentTab] = useState<CalculatorTabsEnum>(
    CalculatorTabsEnum.history,
  );
  const history = useAppSelector((state) => state.calculator.history);
  const memory = useAppSelector((state) => state.calculator.memory);

  const clickHandler = (tab: CalculatorTabsEnum): void => {
    setCurrentTab(tab);
  };

  const tabContentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (tabContentRef.current) {
      tabContentRef.current.scrollTop = tabContentRef.current.scrollHeight;
    }
  }, [history, memory]);

  return (
    <aside className={sidebarStyles.sidebar}>
      <div className={sidebarStyles.tabs}>
        <div className={sidebarStyles.tabs_control}>
          <div
            className={clsx(sidebarStyles.item, {
              [sidebarStyles.item_active]:
                currentTab === CalculatorTabsEnum.history,
            })}
            onClick={() => clickHandler(CalculatorTabsEnum.history)}
          >
            Журнал
          </div>
          <div
            className={clsx(sidebarStyles.item, {
              [sidebarStyles.item_active]:
                currentTab === CalculatorTabsEnum.memory,
            })}
            onClick={() => clickHandler(CalculatorTabsEnum.memory)}
          >
            Память
          </div>
        </div>
        <div className={sidebarStyles.tabs_content} ref={tabContentRef}>
          {currentTab === CalculatorTabsEnum.history && <History />}
          {currentTab === CalculatorTabsEnum.memory && <Memory />}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
