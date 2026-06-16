import { useEffect, useState } from "react";
import {
  fetchUserInfo,
  fetchUserProfileSetting,
  fetchUserGoals,
} from "../../api/profileSettingApi";

import type {
  UserInfo,
  ProfileSetting,
  UserGoals,
} from "../../types/ProfileSetting";

export const useFetchUserProfile = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [profileSetting, setProfileSetting] = useState<ProfileSetting | null>(
    null,
  );
  const [userGoals, setUserGoals] = useState<UserGoals | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchUserProfile = async () => {
    setIsLoading(true);
    setErrorMessage("");

    const userId = localStorage.getItem("userId");

    if (!userId) {
      setErrorMessage("ユーザー情報がありません");
      setIsLoading(false);
      return;
    }

    const { data: userData, error: userError } = await fetchUserInfo(userId);
    const { data: profileData, error: profileError } =
      await fetchUserProfileSetting(userId);
    const { data: goalsData, error: goalsError } = await fetchUserGoals(userId);

    if (userError || profileError || goalsError) {
      setErrorMessage("プロフィール情報の取得に失敗しました");
      setIsLoading(false);
      return;
    }

    setUserInfo(userData);
    setProfileSetting(profileData);
    setUserGoals(goalsData);
  };
  useEffect(() => {
    fetchUserProfile();
  }, []);

  return {
    userInfo,
    profileSetting,
    userGoals,
    isLoading,
    errorMessage,
    fetchUserProfile,
  };
};
