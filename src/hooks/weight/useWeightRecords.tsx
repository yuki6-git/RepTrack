import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import type { WeightRecord } from "../../types/WeightRecord";

type CreateWeightRecordParams = {
  weight: number;
  bodyFat: number;
};

export const useWeightRecords = () => {
  const [weightLogs, setWeightLogs] = useState<WeightRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeightRecords = async () => {
    setIsLoading(true);
    setError("");

    const { data, error } = await supabase
      .from("weight_records")
      .select("*")
      .order("recorded_at", { ascending: false });
    console.log("data", data);
    console.log("error", error);

    if (error) {
      console.log(error.message);
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
    const { error } = await supabase.from("weight_records").insert({
      weight: Number(weight),
      body_fat: Number(bodyFat),
      recorded_at: new Date().toISOString().slice(0, 10),
    });

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
