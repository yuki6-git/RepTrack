import { Heading } from "@chakra-ui/react";
import { TrainingVolumeRanking } from "./lists/TrainingVolumeRanking";
import { TrainingVolumeDetailChart } from "./charts/TrainingVolumeDetailChart";
import { DetailModal } from "./DetailModal";
import type {
  LatestFourVolumeData,
  VolumeData,
} from "../../../types/AnalyticsData";

type Props = {
  latestFourVolumeData: LatestFourVolumeData[];
  volumeData: VolumeData[];
};

export const TrainingVolumeDetailModal = (props: Props) => {
  const { latestFourVolumeData, volumeData } = props;

  return (
    <DetailModal title={"最新4件のトレーニング総重量の詳細"}>
      <TrainingVolumeDetailChart latestFourVolumeData={latestFourVolumeData} />
      <Heading my={4}>最新4件の合計重量ランキング</Heading>
      <TrainingVolumeRanking volumeRanking={volumeData} />
    </DetailModal>
  );
};
