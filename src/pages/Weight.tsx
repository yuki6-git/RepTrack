import { Box, Flex, Heading, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { WeightInputModal } from "../components/weight/WeightInputModal";
import { WeightLineChart } from "../components/weight/WeightLineCharts";
import { useWeightPageData } from "../hooks/weight/useWeightPageData";
import { WeightRecordTable } from "../components/weight/WeightRecordTable";
import { AllWeightRecordModal } from "../components/weight/AllWeightRecordModal";
export const Weight = () => {
  const {
    latestRecord,
    isLoading,
    error,
    displayWeightDiff,
    errorMessage,
    chartData,
    latestWeight,
    latestBodyFat,
    open,
    setOpen,
    onSaveWeight,
    latestFiveRecord,
    weightRecord,
  } = useWeightPageData();

  return (
    <VStack align="stretch" gap="24px">
      <Flex>
        <Heading mr={50} size="xl">
          体重記録
        </Heading>

        <WeightInputModal
          open={open}
          setOpen={setOpen}
          onSaveWeight={onSaveWeight}
          latestWeight={latestWeight}
          latestBodyFat={latestBodyFat}
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
          <WeightLineChart
            chartData={chartData}
            isLoading={isLoading}
            error={error}
          />
        </Box>
      </SimpleGrid>

      <Box p="24px" bg="white" borderRadius="8px" borderWidth="1px">
        <Heading size="md" mb="16px">
          体重記録一覧
        </Heading>

        <WeightRecordTable weightRecord={latestFiveRecord} />

        <AllWeightRecordModal weightRecord={weightRecord} />
      </Box>
    </VStack>
  );
};
