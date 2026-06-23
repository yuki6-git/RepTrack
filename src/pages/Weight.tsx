import { useEffect, useState } from "react";
import { WeightInputModal } from "../components/weight/WeightInputModal";
import { useWeightRecords } from "../hooks/weight/useWeightRecords";

import {
  Box,
  Button,
  Flex,
  Heading,
  SimpleGrid,
  Table,
  Text,
  VStack,
} from "@chakra-ui/react";
import { fetchUserGoals } from "../api/profileSettingApi";
import { getCurrentUserId } from "../api/authApi";
import { WeightLineChart } from "../components/features/register/analytics/WeightLineCharts";

export const Weight = () => {
  const [targetWeight, setTargetWeight] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { weightLogs, isLoading, error, createWeightRecord } =
    useWeightRecords();

  useEffect(() => {
    const fetchTargetWeight = async () => {
      const userId = await getCurrentUserId();
      if (!userId) {
        setErrorMessage("ユーザー情報がありません");
        return;
      }
      const { data: goalsData, error: goalsError } =
        await fetchUserGoals(userId);
      if (goalsError || !goalsData) {
        setErrorMessage("目標体重の取得に失敗しました");
        return;
      }

      setTargetWeight(String(goalsData.target_weight));
    };

    fetchTargetWeight();
  }, []);

  const latestRecord = weightLogs[0];
  const weightDiff =
    latestRecord !== undefined
      ? Number(targetWeight) - latestRecord.weight
      : null;
  const displayWeightDiff =
    weightDiff === null
      ? "-"
      : weightDiff > 0
        ? `+ ${weightDiff}`
        : `${weightDiff}`;

  return (
    <VStack align="stretch" gap="24px">
      <Flex>
        <Heading mr={50} size="xl">
          体重記録
        </Heading>

        <WeightInputModal
          latestWeight={
            latestRecord?.weight !== undefined
              ? String(latestRecord.weight)
              : ""
          }
          latestBodyFat={
            latestRecord?.body_fat !== undefined
              ? String(latestRecord.body_fat)
              : ""
          }
          createWeightRecord={createWeightRecord}
        />
      </Flex>

      {isLoading && <Text color="gray.500">読み込み中...</Text>}
      {error && <Text color="red.500">データの取得に失敗しました</Text>}

      <SimpleGrid columns={{ base: 1, lg: 3 }} gap="24px">
        <Box p="24px" bg="white" borderRadius="8px" borderWidth="1px">
          <Heading size="md" mb="20px">
            最新の記録
          </Heading>

          {errorMessage && <Text>{errorMessage}</Text>}

          <Text color="gray.500" mb="16px">
            {latestRecord?.recorded_at ?? "-"}
          </Text>

          <Box as="dl">
            <Flex justify="space-between" align="baseline" py="8px">
              <Text as="dt" color="gray.500">
                体重
              </Text>
              <Flex as="dd" align="baseline" gap="4px" m="0">
                <Text fontSize="2xl">{latestRecord?.weight ?? "-"}</Text>
                <Text>kg</Text>
              </Flex>
            </Flex>

            <Flex justify="space-between" align="baseline" py="8px">
              <Text as="dt" color="gray.500">
                体脂肪率
              </Text>
              <Flex as="dd" align="baseline" gap="4px" m="0">
                <Text fontSize="2xl">{latestRecord?.body_fat ?? "-"}</Text>
                <Text>%</Text>
              </Flex>
            </Flex>

            <Flex justify="space-between" align="baseline" py="8px">
              <Text as="dt" color="gray.500">
                目標まであと
              </Text>
              <Text as="dd" m="0" fontSize="2xl">
                {displayWeightDiff}kg
              </Text>
            </Flex>
          </Box>
        </Box>
        <Box
          gridColumn={{ base: "auto", lg: "span 2" }}
          p="24px"
          bg="white"
          borderRadius="8px"
          borderWidth="1px"
        >
          <Heading size="md" mb="16px">
            体重の推移
          </Heading>

          <WeightLineChart />
        </Box>
      </SimpleGrid>

      <Box p="24px" bg="white" borderRadius="8px" borderWidth="1px">
        <Heading size="md" mb="16px">
          体重記録一覧
        </Heading>

        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>日付</Table.ColumnHeader>
              <Table.ColumnHeader>体重(kg)</Table.ColumnHeader>
              <Table.ColumnHeader>体脂肪率(%)</Table.ColumnHeader>
              <Table.ColumnHeader>体重変移</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {weightLogs.map((log, index) => {
              const previousLog = weightLogs[index + 1];

              const diff =
                previousLog !== undefined
                  ? Number(log.weight) - Number(previousLog.weight)
                  : null;

              const displayDiff =
                diff === null
                  ? "-"
                  : diff > 0
                    ? `+${diff.toFixed(1)}`
                    : diff.toFixed(1);
              return (
                <Table.Row key={log.id}>
                  <Table.Cell>{log.recorded_at}</Table.Cell>
                  <Table.Cell>{log.weight}</Table.Cell>
                  <Table.Cell>{log.body_fat}</Table.Cell>
                  <Table.Cell>{displayDiff}</Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table.Root>

        <Button mt="20px" variant="outline">
          すべて見る
        </Button>
      </Box>
    </VStack>
  );
};
