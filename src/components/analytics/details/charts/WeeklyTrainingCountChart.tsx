import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { WeeklyTrainingData } from "../../../../types/AnalyticsData";
import { Heading } from "@chakra-ui/react";
import { formatWeekLabel } from "../../../../utils/data/formatWeeklabel.";

type Props = {
  data: WeeklyTrainingData[];
};

export const WeeklyTrainingCountChart = (props: Props) => {
  const { data } = props;

  return (
    <>
      <Heading color="gray.700" mb={4}>
        週ごとのトレーニング回数
      </Heading>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="week"
            tickFormatter={(week) => `${formatWeekLabel(week)}の週`}
            angle={-20}
            dy={16}
            height={50}
          />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" fill="#2563eb" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};
