import {
  insertUser,
  insertProfileSetting,
  insertGoals,
  insertWeightRecord,
} from "../../../api/registerApi";
import { getCurrentUser } from "../../../api/authApi";
import type { RegisterUserInfo } from "../../../types/UserInfoForm";
import type { NavigateFunction } from "react-router-dom";
import type { Dispatch, SetStateAction } from "react";

type Props = {
  userInfo: RegisterUserInfo;
  setErrorMessage: Dispatch<SetStateAction<string>>;
  navigate: NavigateFunction;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

export const onClickRegister = async (props: Props) => {
  const { userInfo, navigate, setErrorMessage, setIsLoading } = props;

  setErrorMessage("");
  setIsLoading(true);

  try {
    const targetCalories = Number(userInfo.targetCalories);

    if (
      !userInfo.targetCalories ||
      targetCalories <= 0 ||
      Number.isNaN(targetCalories)
    ) {
      setErrorMessage("目標カロリーを入力してください");
      return;
    }

    const { data: authData, error: authError } = await getCurrentUser();
    const authUser = authData.user;

    if (authError || !authUser?.id || !authUser.email) {
      setErrorMessage("ログイン情報の取得に失敗しました");
      return;
    }

    const { data: user, error: userError } = await insertUser({
      id: authUser.id,
      username: userInfo.username,
      email: authUser.email,
    });

    if (userError || !user) {
      setErrorMessage("ユーザー情報の保存に失敗しました");
      return;
    }

    const { error: profileError } = await insertProfileSetting({
      userId: user.id,
      userInfo,
    });

    if (profileError) {
      setErrorMessage("ユーザー情報の保存に失敗しました");
      return;
    }

    const { error: goalsError } = await insertGoals({
      userId: user.id,
      userInfo,
    });

    if (goalsError) {
      setErrorMessage("目標情報の保存に失敗しました");
      return;
    }
    const { error: weightError } = await insertWeightRecord({
      userId: user.id,
      weight: userInfo.weight,
    });

    if (weightError) {
      setErrorMessage("初期体重の保存に失敗しました");
      return;
    }

    navigate("/");
  } finally {
    setIsLoading(false);
  }
};
