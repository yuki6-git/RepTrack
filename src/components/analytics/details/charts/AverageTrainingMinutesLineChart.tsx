import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { AverageTrainingMinutesData } from "../../../../types/AnalyticsData";

type Props = {
  data: AverageTrainingMinutesData[];
};
export const AverageTrainingMinutesLineChart = (props: Props) => {
  const { data } = props;
  return (
    <ResponsiveContainer width="100%" height={240}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="label" />
        <YAxis unit="分" />
        <Tooltip formatter={(value) => [`${value}分`, "平均時間"]} />
        <Line
          type="monotone"
          dataKey="averageMinutes"
          stroke="#2563eb"
          strokeWidth={3}
          dot={{ r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
