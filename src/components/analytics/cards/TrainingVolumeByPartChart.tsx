import { Label, Pie, PieChart, Tooltip } from "recharts";
import { HStack, Text, VStack, Box } from "@chakra-ui/react";
import { TrainingVolumeDetailModal } from "../details/TrainingVolumeDetailModal";
import type {
  LatestFourVolumeData,
  TrainingVolumeData,
  VolumeData,
} from "../../../types/AnalyticsData";

type Props = {
  trainingVolumeData: TrainingVolumeData[];
  latestFourVolumeData: LatestFourVolumeData[];
  groupedExercises: VolumeData[];
};
export const TrainingVolumeByPartChart = (props: Props) => {
  const { trainingVolumeData, latestFourVolumeData, groupedExercises } = props;

  return (
    <>
      {trainingVolumeData.length === 0 ? (
        <Text color="gray.500">重量のデータがありません</Text>
      ) : (
        <HStack>
          <PieChart width={300} height={300}>
            <Pie
              data={trainingVolumeData}
              dataKey="totalVolume"
              nameKey="part"
              fill="#8884d8"
              innerRadius="80%"
              outerRadius="100%"
              paddingAngle={4}
              cornerRadius="50%"
            >
              <Label
                value="最新トレーニングの総重量"
                position="center"
                fontSize={16}
                fontWeight="bold"
                color="black"
              />
            </Pie>
            <Tooltip formatter={(value, name) => [`${value}kg`, name]} />
          </PieChart>
          <VStack h="100%" as="ul" ml="4" align="flex-start" justify="stretch">
            <Box>
              {trainingVolumeData.map((partVolume) => (
                <li key={partVolume.part}>
                  <Text fontSize="xl" textAlign="left">
                    {partVolume.part} : {partVolume.totalVolume}kg
                  </Text>
                </li>
              ))}
            </Box>
            <Box mt="50px">
              <TrainingVolumeDetailModal
                latestFourVolumeData={latestFourVolumeData}
                groupedExercises={groupedExercises}
              />
            </Box>
          </VStack>
        </HStack>
      )}
    </>
  );
};
