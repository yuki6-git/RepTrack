import { useState } from "react";
import {
  updateUser,
  updateUserGoals,
  updateUserProfile
} from "../../api/profileSettingApi";
import type { UserGoalsForm, UserProfileSettingForm } from "../../types/UserInfo";

export const useUpdateUserProfile = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const updateProfileSetting = async (form: UserProfileSettingForm) => {
    setIsUpdating(true);
    setErrorMessage("");

    const userId = localStorage.getItem("userId");

    if (!userId) {
      setErrorMessage("ユーザー情報がありません");
      setIsUpdating(false);
      return false;
    }

    const { error: userError } = await updateUser(userId, form);
    const { error: profileError } = await updateUserProfile(
      userId,
      form,
    );

    setIsUpdating(false);

    if (userError || profileError) {
      setErrorMessage("プロフィールの更新に失敗しました");
      return false;
    }

    return true;
  };
  

  const updateGoals = async (form: UserGoalsForm) => {
    setIsUpdating(true);
    setErrorMessage("");

    const userId = localStorage.getItem("userId");

    if (!userId) {
      setErrorMessage("ユーザー情報がありません");
      setIsUpdating(false);
      return false;
    }

    const { error: goalsError } = await updateUserGoals(userId, form);

    setIsUpdating(false);

    if (goalsError) {
      setErrorMessage("目標設定の更新に失敗しました");
      return false;
    }

    return true;
  };

  return {
    updateProfileSetting,
    updateGoals,
    isUpdating,
    errorMessage,
  };
};
