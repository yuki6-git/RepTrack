import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useAnalyticsData } from "../hooks/analytics/useAnalyticsData";
import { WeeklyTrainingProgress } from "../components/analytics/WeeklyTrainingProgress";
import { useFetchUserProfile } from "../hooks/profileSetting/useFetchuserProfile";

const prRecords = [
  { name: "ベンチプレス", weight: "75kg" },
  { name: "スクワット", weight: "110kg" },
  { name: "デッドリフト", weight: "130kg" },
];

const bodyPartStats = [
  { name: "胸", weight: "12,450kg", color: "blue.500" },
  { name: "背中", weight: "15,300kg", color: "green.400" },
  { name: "脚", weight: "18,700kg", color: "yellow.400" },
  { name: "肩", weight: "8,260kg", color: "purple.400" },
  { name: "腕", weight: "6,100kg", color: "gray.500" },
];

export const Analytics = () => {
  // const [bodyPartStats, setBodyPartStats] = useState([]);
  // const [monthlyWorkoutCount, setMonthlyWorkoutCount] = useState(0);
  // const [monthlyChartData, setMonthlyChartData] = useState<MonthlyWorkoutStat[]>([]);
  // const [prRecords, setPrRecords] = useState<PrRecord[]>([]);
  // const [weeklyAverage, setWeeklyAverage] = useState(0);
  // const [achievementRate, setAchievementRate] = useState(0);

  const { createWeeklyTrainingData } = useAnalyticsData();

  const { userGoals } = useFetchUserProfile();
  return (
    <VStack align="stretch" gap="24px">
      <Heading size="xl">分析</Heading>

      <SimpleGrid columns={{ base: 1, lg: 2 }} gap="24px">
        <Box p="24px" bg="white" borderRadius="8px" borderWidth="1px">
          <Heading size="md" mb="20px">
            部位別トレーニング重量
          </Heading>

          <Flex gap="32px">
            <VStack alignItems="stretch" gap="10px" flex="1">
              {bodyPartStats.map((stat) => (
                <Flex key={stat.name} justify="space-between" align="center">
                  <HStack>
                    <Box
                      w="10px"
                      h="10px"
                      borderRadius="full"
                      bg={stat.color}
                    />
                    <Text>{stat.name}:</Text>
                  </HStack>
                  <Text fontWeight="bold">{stat.weight}</Text>
                </Flex>
              ))}
            </VStack>
          </Flex>
        </Box>

        <Box p="24px" bg="white" borderRadius="8px" borderWidth="1px">
          <WeeklyTrainingProgress
            createWeeklyTrainingData={createWeeklyTrainingData}
            userGoals={userGoals}
          />
        </Box>

        <Box p="24px" bg="white" borderRadius="8px" borderWidth="1px">
          <Heading size="md" mb="20px">
            種目別PR更新
          </Heading>

          <VStack align="stretch" gap="12px">
            {prRecords.map((record) => (
              <Flex key={record.name} justify="space-between">
                <Text>{record.name}</Text>
                <Text fontWeight="bold">{record.weight} 🏆</Text>
              </Flex>
            ))}
          </VStack>

          <Button mt="24px" width="100%" variant="outline">
            すべて見る
          </Button>
        </Box>

        <Box p="24px" bg="white" borderRadius="8px" borderWidth="1px">
          <Heading size="md" mb="20px">
            トレーニング頻度（週平均）
          </Heading>

          <Flex align="baseline" gap="8px">
            <Heading size="2xl">3.0</Heading>
            <Text fontWeight="bold">回</Text>
          </Flex>

          <Box mt="24px" h="12px" bg="gray.200" borderRadius="999px">
            <Box h="100%" w="68%" bg="blue.500" borderRadius="999px" />
          </Box>
        </Box>
      </SimpleGrid>

      <Box p="24px" bg="white" borderRadius="8px" borderWidth="1px">
        <Heading size="md" mb="20px">
          達成率（今月）
        </Heading>

        <Flex align="center" gap="24px">
          <Box
            w="96px"
            h="96px"
            borderRadius="full"
            border="12px solid"
            borderColor="blue.500"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Text fontWeight="bold" fontSize="xl">
              80%
            </Text>
          </Box>

          <Text fontWeight="bold">目標：3回/週</Text>
        </Flex>
      </Box>
    </VStack>
  );
};
