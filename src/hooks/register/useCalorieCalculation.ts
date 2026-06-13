import type { UserInfo } from "../../types/UserInfo";

type Props = {
  userInfo: UserInfo;
};

export const useCalorieCalculation = (props: Props) => {
  const { userInfo } = props;

  const canCalculate =
    userInfo.gender &&
    userInfo.birthday &&
    userInfo.height &&
    userInfo.weight &&
    userInfo.activityLevel &&
    userInfo.goalType;
  if (!canCalculate) {
    return {
      bmr: 0,
      estimatedCalories: 0,
      targetCalories: 0,
    };
  }

  const calculateAge = (birthday: string) => {
    if (!birthday) {
      return 0;
    }

    const today = new Date();
    const birthDate = new Date(birthday);

    let age = today.getFullYear() - birthDate.getFullYear();

    const hasNotHadBirthdayThisYear =
      today.getMonth() < birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() &&
        today.getDate() < birthDate.getDate());

    if (hasNotHadBirthdayThisYear) {
      age -= 1;
    }

    return age;
  };

  const calculateBmr = ({
    gender,
    weight,
    height,
    age,
  }: {
    gender: string;
    weight: number;
    height: number;
    age: number;
  }) => {
    if (gender === "male") {
      return 10 * weight + 6.25 * height - 5 * age + 5;
    }
    if (gender === "female") {
      return 10 * weight + 6.25 * height - 5 * age - 161;
    }
    return 10 * weight + 6.25 * height - 5 * age - 78;
  };

  const age = calculateAge(userInfo.birthday);
  const weight = Number(userInfo.weight);
  const height = Number(userInfo.height);

  const bmr = calculateBmr({
    gender: userInfo.gender,
    weight,
    height,
    age,
  });

  const activityLevelMap: Record<string, number> = {
    low: 1.2,
    light: 1.375,
    normal: 1.55,
    high: 1.725,
  };

  const goalAdjustmentMap: Record<string, number> = {
    増量: 300,
    減量: -400,
    維持: 0,
  };

  const estimatedCalories = Math.round(
    bmr * (activityLevelMap[userInfo.activityLevel] ?? 1),
  );

  const targetCalories =
    estimatedCalories + (goalAdjustmentMap[userInfo.goalType] ?? 0);

  return {
    bmr,
    estimatedCalories,
    targetCalories,
  };
};
