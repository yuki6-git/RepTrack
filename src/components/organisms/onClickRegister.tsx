import {
  insertUser,
  insertProfileSetting,
  insertGoals,
  insertWeightRecord,
} from "../../api/registerApi";

const onClickRegister = async (props) => {
  const { isManualCalories, manualTargetCalories, targetCalories, userInfo } =
    props;

  const savedTargetCalories = isManualCalories
    ? Number(manualTargetCalories)
    : targetCalories;

  const { data: user, error: userError } = await insertUser({
    username: userInfo.username,
    email: userInfo.email,
  });

  if (userError) {
    return;
  }

  await insertProfileSetting({
    userId: user.id,
    userInfo,
  });

  await insertGoals({
    userId: user.id,
    userInfo,
    targetCalories,
  });

  await insertWeightRecord({
    userId: user.id,
    weight: userInfo.weight,
  });

  localStorage.setItem("userId", user.id);

  navigate("/");
};
