import { FC, useState } from "react";
import clsx from "clsx";
import History from "@/components/Calculator/History/History.tsx";
import Memory from "@/components/Calculator/Memory/Memory.tsx";

enum CalculatorTabsEnum {
  log,
  history,
}

const Sidebar: FC = () => {
  const [currentTab, setCurrentTab] = useState<CalculatorTabsEnum>(
    CalculatorTabsEnum.history,
  );

  const clickHandler = (tab: CalculatorTabsEnum) => (): void => {
    setCurrentTab(tab);
  };

  return (
    <div className="calculator__sidebar">
      <div className="tabs">
        <div className="tabs__control">
          <div
            className={clsx("tabs__item", {
              tabs__item_active: currentTab === CalculatorTabsEnum.history,
            })}
            onClick={clickHandler(CalculatorTabsEnum.history)}
          >
            Журнал
          </div>
          <div
            className={clsx("tabs__item", {
              tabs__item_active: currentTab === CalculatorTabsEnum.log,
            })}
            onClick={clickHandler(CalculatorTabsEnum.log)}
          >
            Память
          </div>
        </div>
        <div className="tabs__content">
          {currentTab === CalculatorTabsEnum.history && <History />}
          {currentTab === CalculatorTabsEnum.log && <Memory />}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
