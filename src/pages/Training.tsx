import { TrainingMenuProvider } from "../context/TrainingMenuContext";
import {TrainingContent} from "../components/training/TrainingContent"

export const Training = () => {
  return (
    <TrainingMenuProvider>
      <TrainingContent />
    </TrainingMenuProvider>
  );
};
