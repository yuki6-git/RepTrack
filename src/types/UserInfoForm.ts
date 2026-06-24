export type UserProfileForm = {
  username: string;
  email: string;
  gender: string;
  birthday: string;
};

export type UserProfileSettingForm = UserProfileForm & {
  height: string;
  activityLevel: string;
  goalType: string;
};

export type UserGoalsForm = {
  weeklyGoal: string;
  targetWeight: string;
  targetCalories: string;
};

export type RegisterUserInfo = {
  username: string;
  gender: string;
  birthday: string;
  height: string;
  weight: string;
  bodyFat: string;
  goalType: string;
  activityLevel: string;
  weeklyGoal: string;
  targetWeight: string;
  targetCalories: string;
};
