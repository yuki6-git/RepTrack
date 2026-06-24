import type { RegisterUserInfo } from "../../../types/UserInfoForm";

export type UserInfoErrors = Partial<Record<keyof RegisterUserInfo, string>>;

export const checkRequiredField = (
  userInfo: RegisterUserInfo,
): UserInfoErrors => {
  const errors: UserInfoErrors = {};

  if (!userInfo.username.trim()) {
    errors.username = "ユーザー名を入力してください";
  }

  if (!userInfo.gender.trim()) {
    errors.gender = "性別を選択してください";
  }

  if (!userInfo.birthday.trim()) {
    errors.birthday = "生年月日を入力してください";
  }

  if (!userInfo.height.trim()) {
    errors.height = "身長を入力してください";
  }

  if (!userInfo.weight.trim()) {
    errors.weight = "体重を入力してください";
  }
  if (!userInfo.goalType.trim()) {
    errors.goalType = "目標タイプを選択してください";
  }

  if (!userInfo.activityLevel.trim()) {
    errors.activityLevel = "活動レベルを選択してください";
  }

  if (!userInfo.weeklyGoal.trim()) {
    errors.weeklyGoal = "週間トレーニング目標を入力してください";
  }

  if (!userInfo.targetWeight.trim()) {
    errors.targetWeight = "目標体重を入力してください";
  }

  return errors;
};
