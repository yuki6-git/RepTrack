export type UserInfo = {
  id: string;
  username: string;
  email: string;
  created_at: string;
};

export type ProfileSetting = {
  id: string;
  user_id: string;
  age: number | null;
  height: number | null;
  activity_level: string;
  goal_type: string;
  birthday: string;
  gender: string;
  created_at: string;
};

export type UserGoals = {
  id: string;
  user_id: string;
  weekly_goal: number;
  target_weight: number;
  target_calories: number;
  created_at: string;
};
