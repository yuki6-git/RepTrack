import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import { useTrainingMenus } from "../hooks/training/useTrainingMenus";

type TrainingMenuContextValue = ReturnType<typeof useTrainingMenus>;

const TrainingMenuContext = createContext<TrainingMenuContextValue | null>(
  null,
);

type Props = {
  children: ReactNode;
};

export const TrainingMenuProvider = (props: Props) => {
  const { children } = props;

  const trainingMenu = useTrainingMenus();

  return (
    <TrainingMenuContext.Provider value={trainingMenu}>
      {children}
    </TrainingMenuContext.Provider>
  );
};

export const useTrainingMenuContext = () => {
  const context = useContext(TrainingMenuContext);

  if (!context) {
    throw new Error("TrainingMenuProviderの中で使ってください");
  }

  return context;
};
