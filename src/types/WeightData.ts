export type WeightRecord = {
  id: string;
  user_id: string;
  weight: number;
  body_fat: number;
  recorded_at: string;
  created_at: string;
};
export type CreateWeightRecord = (params: {
  weight: string;
  bodyFat: string;
}) => Promise<void>;

export type ChartData = {
  date: string;
  weight: number;
};

export type WeightTableData = {
  displayDiff: string;
  id: string;
  user_id: string;
  weight: number;
  body_fat: number;
  recorded_at: string;
  created_at: string;
};
