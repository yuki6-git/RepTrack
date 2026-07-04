import { supabase } from "../lib/supabase";
import type { RegisterUserInfo } from "../types/UserInfoForm";

export const insertUser = async ({
  id,
  username,
  email,
}: {
  id: string;
  username: string;
  email: string;
}) => {
  return await supabase
    .from("users")
    .upsert({ id, username, email })
    .select()
    .single();
};

export const insertProfileSetting = async ({
  userId,
  userInfo,
}: {
  userId: string;
  userInfo: RegisterUserInfo;
}) => {
  return await supabase.from("profile_setting").upsert({
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
}: {
  userId: string;
  userInfo: RegisterUserInfo;
}) => {
  return await supabase.from("goals").upsert({
    user_id: userId,
    weekly_goal: Number(userInfo.weeklyGoal),
    target_weight: Number(userInfo.targetWeight),
    target_calories: Number(userInfo.targetCalories),
  });
};

export const insertWeightRecord = async ({
  userId,
  weight,
  bodyFat,
}: {
  userId: string;
  weight: string;
  bodyFat: string;
}) => {
  return await supabase.from("weight_records").insert({
    user_id: userId,
    weight: Number(weight),
    body_fat: bodyFat === "" ? null : Number(bodyFat),
    recorded_at: new Date().toISOString().slice(0, 10),
  });
};
