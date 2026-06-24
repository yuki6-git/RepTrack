import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Box, Heading, Text } from "@chakra-ui/react";
import type { WeightRecord } from "../../types/WeightRecord";

type Props = {
  weightLogs: WeightRecord[];
  isLoading: boolean;
  error: string;
};
export const WeightLineChart = (props: Props) => {
  const { weightLogs, isLoading, error } = props;

  const formatMonthDay = (date: string) => {
    const parsedDate = new Date(date);
    const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
    const day = String(parsedDate.getDate()).padStart(2, "0");
    return `${month}/${day}`;
  };

  const chartData = weightLogs
    .slice(0, 7)
    .reverse()
    .map((log) => ({
      date: formatMonthDay(log.recorded_at),
      weight: log.weight,
    }));

  if (isLoading) {
    return <Text>読み込み中...</Text>;
  }

  if (error) {
    return <Text color="red.500">体重データの取得に失敗しました</Text>;
  }

  return (
    <Box
      borderRadius="8px"
      bg="gray.50"
      borderWidth="1px"
      display="flex"
      alignItems="center"
      justifyContent="start"
    >
      <Box p="24px" bg="white" borderRadius="8px" borderWidth="1px" w="100%">
        <Heading size="md" mb="20px">
          体重推移
        </Heading>

        <Box h="280px">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" dy={10} />
              <YAxis domain={["dataMin - 1", "dataMax + 1"]} />
              <Tooltip formatter={(value) => [`${value}kg`, "体重"]} />
              <Line
                type="monotone"
                dataKey="weight"
                stroke="#2563eb"
                strokeWidth={3}
                dot
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </Box>
  );
};
