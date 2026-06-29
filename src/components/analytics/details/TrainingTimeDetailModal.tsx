import type { WorkoutLog } from "../../../types/Workout";
import { TrainingTimeDetail } from "./lists/TrainingTimeDetail";
import { DetailModal } from "./DetailModal";

type Props = {
  logs: WorkoutLog[];
};
export const TrainingTimeDetailModal = (props: Props) => {
  const { logs } = props;
  return (
    <DetailModal title="トレーニング時間の詳細">
      <TrainingTimeDetail logs={logs} />
    </DetailModal>
  );
};
