import { DetailModal } from "./DeatailModal";
import { AllPrByExercisesList } from "../../organisms/analyticsDetail/AllPrByExercisesList";
import type { CreateExercisesPr } from "../PrByExercisesList";

type Props = { ExercisePrData: CreateExercisesPr[] };
export const PrDetailModal = (props: Props) => {
  const { ExercisePrData } = props;
  return (
    <DetailModal title={"PR記録の詳細"}>
      <AllPrByExercisesList ExercisePrData={ExercisePrData} />
    </DetailModal>
  );
};
