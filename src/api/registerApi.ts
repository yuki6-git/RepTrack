import { supabase } from "../lib/supabase";
import type { UserInfo } from "../types/UserInfo";

export const insertUser = async ({
  username,
  email,
}: {
  username: string;
  email: string;
}) => {
  return await supabase
    .from("users")
    .insert({ username, email })
    .select()
    .single();
};

export const insertProfileSetting = async ({
  userId,
  userInfo,
}: {
  userId: string;
  userInfo: UserInfo;
}) => {
  return await supabase.from("profile_setting").insert({
    user_id: userId,
    birthday: userInfo.birthday,
    gender: userInfo.gender,
    height: Number(userInfo.height),
    activity_level: userInfo.activityLevel,
    goal_type: userInfo.goalType,
  });
};

export const insertGoals = async ({
  userId,
  userInfo,
  targetCalories,
}: {
  userId: string;
  userInfo: UserInfo;
  targetCalories: number;
}) => {
  return await supabase.from("goals").insert({
    user_id: userId,
    weekly_goal: Number(userInfo.weeklyGoal),
    target_weight: Number(userInfo.targetWeight),
    target_calories: targetCalories,
  });
};

export const insertWeightRecord = async ({
  userId,
  weight,
}: {
  userId: string;
  weight: string;
}) => {
  return await supabase.from("weight_records").insert({
    user_id: userId,
    weight: Number(weight),
    recorded_at: new Date().toISOString().slice(0, 10),
  });
};
