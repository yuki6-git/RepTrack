import { Heading } from "@chakra-ui/react";
import { useAnalyticsData } from "../../../hooks/analytics/useAnalyticsData";
import { useWorkoutLogs } from "../../../hooks/workout/useWorkoutLogs";
import { TrainingVolumeRanking } from "../../organisms/analyticsDetail/TrainingVolumeRanking";
import { TrainingVolumeDetailChart } from "./chart/TrainingVolumeDetailChart";
import { DetailModal } from "./DeatailModal";

export const TrainingVolumeDetailModal = () => {
  const { calculateTrainingVolumebypart } = useAnalyticsData();
  const { logs } = useWorkoutLogs();
  const latestExerciseRecords = logs
    .slice(0, 4)
    .flatMap((log) => log.records ?? []);
  const volumeData = calculateTrainingVolumebypart(latestExerciseRecords).sort(
    (a, b) => b.totalVolume - a.totalVolume,
  );
  const latestFourVolumeData = logs.slice(0, 4).map((log) => ({
    id: log.id,
    date: log.date,
    title: log.title,
    volumeData,
  }));
  return (
    <DetailModal title={"最新4件のトレーニング総重量の詳細"}>
      <TrainingVolumeDetailChart latestFourVolumeData={latestFourVolumeData} />
      <Heading my={4}>最新4件の合計重量ランキング</Heading>
      <TrainingVolumeRanking volumeRanking={volumeData} />
    </DetailModal>
  );
};
