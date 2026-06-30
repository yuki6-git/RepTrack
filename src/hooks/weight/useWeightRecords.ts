import { useState, useEffect } from "react";
import { fetchweightRecords, insertWeightRecords } from "../../api/weightApi";
import type { WeightRecord } from "../../types/WeightData";
import { getCurrentUserId } from "../../api/authApi";

type CreateWeightRecordParams = {
  weight: string;
  bodyFat: string;
};

export const useWeightRecords = () => {
  const [weightLogs, setWeightLogs] = useState<WeightRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeightRecords = async () => {
    setIsLoading(true);
    setError("");

    const userId = await getCurrentUserId();
    if (!userId) {
      setError("ユーザー情報がありません");
      setIsLoading(false);
      return;
    }

    const { data, error } = await fetchweightRecords(userId ?? "");

    if (error) {
      setError(error.message);
      setIsLoading(false);
      return;
    }

    setWeightLogs(data ?? []);
    setIsLoading(false);
  };

  const createWeightRecord = async ({
    weight,
    bodyFat,
  }: CreateWeightRecordParams) => {

    const userId = await getCurrentUserId();
    if (!userId) {
      setError("ユーザー情報がありません");
      setIsLoading(false);
      return;
    }
    const { error } = await insertWeightRecords(userId, weight, bodyFat);

    if (error) {
      setError(error.message);
      return;
    }

    await fetchWeightRecords();
  };
  useEffect(() => {
    fetchWeightRecords();
  }, []);

  
  

  return {
    weightLogs,
    isLoading,
    error,
    fetchWeightRecords,
    createWeightRecord,
  };

};
