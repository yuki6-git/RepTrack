import { Box, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { Label, Pie, PieChart, Tooltip } from "recharts";
import type { LatestFourVolumeData } from "../../../../types/AnalyticsData";
type Props = {
  latestFourVolumeData: LatestFourVolumeData[];
};
export const TrainingVolumeDetailChart = (props: Props) => {
  const { latestFourVolumeData } = props;

  return (
    <SimpleGrid columns={{ base: 2, md: 4 }} gap="20px">
      {latestFourVolumeData.map((workoutVolume) => (
        <Box
          key={workoutVolume.id}
          p="16px"
          borderWidth="1px"
          borderRadius="12px"
          bg="white"
          boxShadow="sm"
        >
          <Heading size="md">{workoutVolume.date}</Heading>
          <Text color="gray.500" mb="12px">
            {workoutVolume.title}
          </Text>

          <PieChart width={260} height={260}>
            <Pie
              data={workoutVolume.volumeData}
              dataKey="totalVolume"
              nameKey="part"
              fill="#8884d8"
              innerRadius="80%"
              outerRadius="100%"
              paddingAngle={4}
              cornerRadius="50%"
            >
              <Label
                value="部位別総重量"
                position="center"
                fontSize={14}
                fontWeight="bold"
              />
            </Pie>
            <Tooltip formatter={(value, name) => [`${value}kg`, name]} />
          </PieChart>
        </Box>
      ))}
    </SimpleGrid>
  );
};
