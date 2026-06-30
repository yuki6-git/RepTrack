import { DetailModal } from "./DetailModal";
import { AllPrByExercisesList } from "./lists/AllPrByExercisesList";
import type { ExercisePrData } from "../../../types/AnalyticsData";

type Props = { ExercisePrData: ExercisePrData[] };
export const PrDetailModal = (props: Props) => {
  const { ExercisePrData } = props;
  return (
    <DetailModal title={"PR記録の詳細"}>
      <AllPrByExercisesList ExercisePrData={ExercisePrData} />
    </DetailModal>
  );
};
