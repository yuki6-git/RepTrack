import { useCallback, useEffect, useState } from "react";
import type { Tab, TrainingMenu } from "../../types/TrainingMenu";

type Props = {
  trainingMenus: TrainingMenu[];
};

export const useTrainingTabs = (props: Props) => {
  const { trainingMenus } = props;
  const [tabs, setTabs] = useState<Tab[]>([{ id: crypto.randomUUID() }]);
  const [selectedTab, setSelectedTab] = useState<string | null>(tabs[0].id);

  useEffect(() => {
    if (trainingMenus.length === 0) {
      return;
    }
    const savedTabs = trainingMenus.map((menu) => ({ id: menu.tabId }));
    setTabs(savedTabs);
    setSelectedTab((prev) => {
      const selectedTab = savedTabs.find((tab) => tab.id === prev);
      return selectedTab ? prev : savedTabs[0].id;
    });
  }, [trainingMenus]);

  const addTab = useCallback(() => {
    if (tabs.length < 7) {
      const newTab = {
        id: crypto.randomUUID(),
      };
      const newTabs = [...tabs, newTab];

      setTabs(newTabs);
      setSelectedTab(newTabs[newTabs.length - 1].id);
    } else {
      alert("追加できるメニューは７件までです");
      return;
    }
  }, [tabs]);

  const removeTab = useCallback(
    (id: string) => {
      if (tabs.length > 1) {
        const newTabs = [...tabs].filter((tab) => tab.id !== id);
        setTabs(newTabs);
        setSelectedTab(newTabs[0].id);
      }
      alert("トレーニングメニューは最低１件必要です");
    },
    [tabs],
  );
  return {
    selectedTab,
    setSelectedTab,
    tabs,
    removeTab,
    addTab,
    trainingMenus,
  };
};
