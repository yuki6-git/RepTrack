import { useState } from "react";
import { Text, Box, Button, Heading, VStack, Flex } from "@chakra-ui/react";

export const Dashboard = () => {
  const [currentWeight, setCurrentWeight] = useState(55);
  const [targetWeight, setTargetWeight] = useState(60);
  const [weeklyWorkoutCount, setWeeklyWorkoutCount] = useState(4);
  const [continuousGoal, setContinuousGoal] = useState(3);
  const [todayTraining, setTodayTraining] = useState("背中");
  const [latestPr, setLatestPr] = useState(90);

  const weightDiff = targetWeight - currentWeight;
  const displayWeightDiff = weightDiff > 0 ? `+${weightDiff}` : `${weightDiff}`;

  return (
    <VStack gap="24px" align="stretch">
      <Box p="24px" borderRadius="16px" boxShadow="md">
        <Heading size="xl" mb="8px">
          Weight
        </Heading>
        <Text mb="20px">現在の体重は{currentWeight}kgです。</Text>
        <Text mb="20px">目標まであと{displayWeightDiff}kgです。</Text>
        <Flex mt="16px" justify="flex-end">
          <Button>詳細ページ</Button>
        </Flex>
      </Box>

      <Box p="24px" borderRadius="16px" boxShadow="md">
        <Heading size="xl" mb="8px">
          Weekly Goal
        </Heading>
        <Text mb="20px">今週は{weeklyWorkoutCount}回トレーニングしました</Text>
        <Text mb="20px">{continuousGoal}週連続目標達成です！</Text>
        <Flex mt="16px" justify="flex-end">
          <Button>詳細ページ</Button>
        </Flex>
      </Box>

      <Box p="24px" borderRadius="16px" boxShadow="md">
        <Heading size="xl" mb="8px">
          Today's Training
        </Heading>
        <Text mb="20px">今日は{todayTraining}トレーニングの日です。</Text>
        <Flex mt="16px" justify="flex-end">
          <Button>詳細ページ</Button>
        </Flex>
      </Box>

      <Box p="24px" borderRadius="16px" boxShadow="md">
        <Heading size="xl" mb="8px">
          PRUPDATE
        </Heading>
        <Text mb="20px">ベンチプレスのMAX重量が{latestPr}kgになりました!</Text>
        <Flex mt="16px" justify="flex-end">
          <Button>詳細ページ</Button>
        </Flex>
      </Box>
    </VStack>
  );
};
