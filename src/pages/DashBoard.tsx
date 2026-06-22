import { Text, Box, Button, Heading, VStack, Flex } from "@chakra-ui/react";
import { useDashboardData } from "../hooks/dashboard/useDashboardData";

export const Dashboard = () => {
  const { dashboardData } = useDashboardData();

  const latestWeight = dashboardData?.latestWeight ?? null;
  const targetWeight = dashboardData?.targetWeight ?? null;
  const weeklyWorkoutCount = dashboardData?.weeklyWorkoutCount ?? 0;
  const weeklyGoal = dashboardData?.weeklyGoal ?? null;
  const todayTrainingTitle = dashboardData?.todayTrainingMenu?.title ?? null;
  const latestPr = dashboardData?.latestPr ?? null;

  const weightDiff =
    targetWeight !== null && latestWeight !== null
      ? targetWeight - latestWeight
      : null;

  const displayWeightDiff =
    weightDiff !== null
      ? weightDiff > 0
        ? `+${weightDiff}`
        : `${weightDiff}`
      : null;

  return (
    <VStack gap="24px" align="stretch">
      <Box p="24px" borderRadius="16px" boxShadow="md">
        <Heading size="xl" mb="8px">
          Weight
        </Heading>
        <Text mb="20px">現在の体重は{latestWeight ?? "-"}kgです。</Text>
        <Text mb="20px">目標まであと{displayWeightDiff}kgです。</Text>
        <Flex mt="16px" justify="flex-end">
          <Button>詳細ページ</Button>
        </Flex>
      </Box>

      <Box p="24px" borderRadius="16px" boxShadow="md">
        <Heading size="xl" mb="8px">
          Weekly Goal
        </Heading>
        <Text mb="20px">
          今週は{weeklyWorkoutCount}/{weeklyGoal ?? ""}回トレーニングしました
        </Text>
        <Flex mt="16px" justify="flex-end">
          <Button>詳細ページ</Button>
        </Flex>
      </Box>

      <Box p="24px" borderRadius="16px" boxShadow="md">
        <Heading size="xl" mb="8px">
          Today's Training
        </Heading>
        <Text mb="20px">
          今日は{todayTrainingTitle ?? "未設定"}の日です。
        </Text>
        <Flex mt="16px" justify="flex-end">
          <Button>詳細ページ</Button>
        </Flex>
      </Box>

      <Box p="24px" borderRadius="16px" boxShadow="md">
        <Heading size="xl" mb="8px">
          PERSONAL RECORD
        </Heading>
        <Text mb="20px">
          {latestPr
            ? `${latestPr.exercise_name}のMAX重量が${latestPr.max_weight ?? "-"}kgです!`
            : "PR記録はまだありません"}
        </Text>
        <Flex mt="16px" justify="flex-end">
          <Button>詳細ページ</Button>
        </Flex>
      </Box>
    </VStack>
  );
};
