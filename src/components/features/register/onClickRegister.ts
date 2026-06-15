import {
  insertUser,
  insertProfileSetting,
  insertGoals,
  insertWeightRecord,
} from "../../../api/registerApi";
import type { UserInfo } from "../../../types/UserInfo";
import type { NavigateFunction } from "react-router-dom";
import type { Dispatch, SetStateAction } from "react";

type Props = {
  displayTargetCalories: string;
  userInfo: UserInfo;
  setErrorMessage: Dispatch<SetStateAction<string>>;
  navigate: NavigateFunction;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

export const onClickRegister = async (props: Props) => {
  const {
    displayTargetCalories,
    userInfo,
    navigate,
    setErrorMessage,
    setIsLoading,
  } = props;

  setErrorMessage("");
  setIsLoading(true);

  try {
    const targetCalories = Number(displayTargetCalories);

    if (
      !displayTargetCalories ||
      targetCalories <= 0 ||
      Number.isNaN(targetCalories)
    ) {
      setErrorMessage("目標カロリーを入力してください");
      return;
    }

    const { data: user, error: userError } = await insertUser({
      username: userInfo.username,
      email: userInfo.email,
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
      targetCalories,
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

    localStorage.setItem("userId", user.id);

    navigate("/");
  } finally {
    setIsLoading(false);
  }
};
