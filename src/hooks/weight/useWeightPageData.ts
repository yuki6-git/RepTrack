import { useEffect, useMemo, useState } from "react";
import { useWeightRecords } from "./useWeightRecords";
import { getCurrentUserId } from "../../api/authApi";
import { fetchUserGoals } from "../../api/profileSettingApi";
import { formatMonthDay } from "../../utils/data/formatMonthDay";

export const useWeightPageData = () => {
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

  const latestWeight =
    latestRecord?.weight !== undefined ? String(latestRecord.weight) : "";
  const latestBodyFat =
    latestRecord?.body_fat !== undefined ? String(latestRecord.body_fat) : "";

  const latestFiveRecord = useMemo(() => {
    return weightLogs.slice(0, 5).map((log, index) => {
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

      return {
        ...log,
        displayDiff,
      };
    });
  }, [weightLogs]);

  const [open, setOpen] = useState(false);
  const onSaveWeight = async (weight: string, bodyFat: string) => {
    await createWeightRecord({
      weight,
      bodyFat,
    });
    setOpen(false);
  };

  const chartData = useMemo(() => {
    return weightLogs
      .slice(0, 7)
      .reverse()
      .map((log) => ({
        date: formatMonthDay(log.recorded_at),
        weight: log.weight,
      }));
  }, [weightLogs]);
  
  return {
    latestRecord,
    createWeightRecord,
    isLoading,
    error,
    displayWeightDiff,
    errorMessage,
    weightLogs,
    latestWeight,
    latestBodyFat,
    onSaveWeight,
    setOpen,
    open,
    latestFiveRecord,
    chartData,
  };
};
