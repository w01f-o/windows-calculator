import { FC, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import History from "@/components/Calculator/History/History.tsx";
import Memory from "@/components/Calculator/Memory/Memory.tsx";
import { useAppSelector } from "@/hooks/redux.ts";
import sidebarStyles from "./sidebar.module.scss";

enum CalculatorTabsEnum {
  log,
  history,
}

const Sidebar: FC = () => {
  const [currentTab, setCurrentTab] = useState<CalculatorTabsEnum>(
    CalculatorTabsEnum.history,
  );

  const { history } = useAppSelector((state) => state.calculator);

  const clickHandler = (tab: CalculatorTabsEnum) => (): void => {
    setCurrentTab(tab);
  };

  const tabContentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (tabContentRef.current) {
      tabContentRef.current.scrollTop = tabContentRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <div className={sidebarStyles.sidebar}>
      <div className={sidebarStyles.tabs}>
        <div className={sidebarStyles.tabs_control}>
          <div
            className={clsx(sidebarStyles.item, {
              [sidebarStyles.item_active]:
                currentTab === CalculatorTabsEnum.history,
            })}
            onClick={clickHandler(CalculatorTabsEnum.history)}
          >
            Журнал
          </div>
          <div
            className={clsx(sidebarStyles.item, {
              [sidebarStyles.item_active]:
                currentTab === CalculatorTabsEnum.log,
            })}
            onClick={clickHandler(CalculatorTabsEnum.log)}
          >
            Память
          </div>
        </div>
        <div className={sidebarStyles.tabs_content} ref={tabContentRef}>
          {currentTab === CalculatorTabsEnum.history && <History />}
          {currentTab === CalculatorTabsEnum.log && <Memory />}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
