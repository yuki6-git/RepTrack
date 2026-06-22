import { supabase } from "../lib/supabase";
import type { UserGoalsForm, UserProfileForm, UserProfileSettingForm } from "../types/UserInfoForm";

export const fetchUserInfo = async (userId: string) => {
  return await supabase.from("users").select("*").eq("id", userId).single();
};

export const fetchUserProfileSetting = async (userId: string) => {
  return await supabase
    .from("profile_setting")
    .select("*")
    .eq("user_id", userId)
    .single();
};

export const fetchUserGoals = async (userId: string) => {
  return await supabase
    .from("goals")
    .select("*")
    .eq("user_id", userId)
    .single();
};

export const updateUserProfile = async (
  userId: string,
  form: UserProfileSettingForm,
) => {
  return await supabase
    .from("profile_setting")
    .update({
      gender: form.gender,
      birthday: form.birthday,
      height: Number(form.height),
      activity_level: form.activityLevel,
      goal_type: form.goalType,
    })
    .eq("user_id", userId);
};

export const updateUserGoals = async (
  userId: string,
  form: UserGoalsForm,
) => {
  return await supabase
    .from("goals")
    .update({
      weekly_goal: Number(form.weeklyGoal),
      target_weight: Number(form.targetWeight),
      target_calories: Number(form.targetCalories),
    })
    .eq("user_id", userId);
};
export const updateUser = async (userId: string, form: UserProfileForm) => {
  return await supabase
    .from("users")
    .update({
      username: form.username,
      email: form.email,
    })
    .eq("id", userId);
};
