import {
  Heading,
  Text,
  Grid,
  VStack,
  Box,
  Input,
  Button,
  SimpleGrid,
  Flex,
  NativeSelect,
  NumberInput,
  InputGroup,
  SegmentGroup,
  Field,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useCalorieCalculation } from "../hooks/register/useCalorieCalculation";
import { ManualCaloriModal } from "../components/register/ManualcaloriModal";
import { useNavigate } from "react-router-dom";
import { onClickRegister } from "../features/register/onClickRegister";
import {
  checkRequiredField,
  type UserInfoErrors,
} from "../features/register/checkRequiredField";
import type { RegisterUserInfo } from "../types/UserInfoForm";

export const Register = () => {
  const initialUserInfo = {
    username: "",
    gender: "",
    birthday: "",
    height: "",
    weight: "",
    bodyFat: "",
    goalType: "",
    activityLevel: "",
    weeklyGoal: "",
    targetWeight: "",
    targetCalories: "",
  };

  const [userInfo, setUserInfo] = useState<RegisterUserInfo>(initialUserInfo);
  const [isManualCalories, setIsManualCalories] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<UserInfoErrors>({});

  const { estimatedCalories, targetCalories } = useCalorieCalculation({
    userInfo,
  });

  useEffect(() => {
    if (isManualCalories) {
      return;
    }

    setUserInfo((prev) => ({
      ...prev,
      targetCalories: String(targetCalories),
    }));
  }, [targetCalories, isManualCalories]);

  const displayTargetCalories = userInfo.targetCalories;

  const navigate = useNavigate();
  const onClickCancel = () => {
    const isCancel = window.confirm(
      "ユーザー登録をキャンセルしますか？\n入力内容は保存されません。",
    );

    if (!isCancel) {
      return;
    }

    navigate("/login");
  };

  return (
    <VStack align="stretch" gap="24px">
      <Box mt={4} mx={8}>
        <Heading fontWeight="bold" fontSize="2xl" as="h1">
          新規登録
        </Heading>
        <Text my={4}>アカウントを作成して、トレーニング記録をつけよう！</Text>
      </Box>
      <Grid
        templateColumns={{
          base: "1fr",
          lg: "3fr 1fr",
        }}
        gap="20px"
        w="100%"
      >
        <Box
          bg="white"
          borderWidth="1px"
          borderColor="gray.200"
          borderRadius="8px"
          p="30px"
          mx={8}
        >
          <VStack align="stretch" w="100%">
            <Heading size="md">ユーザー情報</Heading>
            <SimpleGrid columns={2} gap="16px">
              <Field.Root w="100%" invalid={Boolean(fieldErrors.username)}>
                <Field.Label>ユーザー名</Field.Label>
                <Input
                  placeholder="ユーザー名を入力"
                  value={userInfo.username}
                  onChange={(e) =>
                    setUserInfo({
                      ...userInfo,
                      username: e.target.value,
                    })
                  }
                />
                <Field.ErrorText>{fieldErrors.username}</Field.ErrorText>
              </Field.Root>
              <Field.Root invalid={Boolean(fieldErrors.birthday)}>
                <Field.Label>生年月日</Field.Label>
                <Input
                  type="date"
                  value={userInfo.birthday}
                  onChange={(e) =>
                    setUserInfo({
                      ...userInfo,
                      birthday: e.target.value,
                    })
                  }
                />
                <Field.ErrorText>{fieldErrors.birthday}</Field.ErrorText>
              </Field.Root>
            </SimpleGrid>

            <SimpleGrid columns={2} gap="16px">
              <Field.Root invalid={Boolean(fieldErrors.gender)}>
                <Field.Label>性別</Field.Label>
                <NativeSelect.Root>
                  <NativeSelect.Field
                    value={userInfo.gender}
                    onChange={(e) =>
                      setUserInfo({
                        ...userInfo,
                        gender: e.target.value,
                      })
                    }
                  >
                    <option value="">選択してください</option>
                    <option value="male">男性</option>
                    <option value="female">女性</option>
                    <option value="other">その他</option>
                  </NativeSelect.Field>
                  <NativeSelect.Indicator />
                </NativeSelect.Root>
                <Field.ErrorText>{fieldErrors.gender}</Field.ErrorText>
              </Field.Root>
              <Field.Root invalid={Boolean(fieldErrors.height)}>
                <Field.Label>身長</Field.Label>
                <NumberInput.Root
                  w="100%"
                  min={0}
                  value={userInfo.height}
                  onValueChange={(e) =>
                    setUserInfo({
                      ...userInfo,
                      height: e.value,
                    })
                  }
                >
                  <InputGroup endElement="cm">
                    <NumberInput.Input />
                  </InputGroup>
                </NumberInput.Root>
                <Field.ErrorText>{fieldErrors.height}</Field.ErrorText>
              </Field.Root>
            </SimpleGrid>

            <SimpleGrid columns={2} gap="16px">
              <Field.Root invalid={Boolean(fieldErrors.weight)}>
                <Field.Label>体重</Field.Label>
                <NumberInput.Root
                  w="100%"
                  min={0}
                  value={userInfo.weight}
                  onValueChange={(e) =>
                    setUserInfo({
                      ...userInfo,
                      weight: e.value,
                    })
                  }
                >
                  <InputGroup endElement="kg">
                    <NumberInput.Input />
                  </InputGroup>
                </NumberInput.Root>
                <Field.ErrorText>{fieldErrors.weight}</Field.ErrorText>
              </Field.Root>

              <Field.Root>
                <Field.Label>体脂肪率 (optional)</Field.Label>
                <NumberInput.Root
                  w="100%"
                  min={0}
                  value={userInfo.bodyFat}
                  onValueChange={(e) =>
                    setUserInfo({
                      ...userInfo,
                      bodyFat: e.value,
                    })
                  }
                >
                  <InputGroup endElement="%">
                    <NumberInput.Input />
                  </InputGroup>
                </NumberInput.Root>
              </Field.Root>
            </SimpleGrid>

            <SimpleGrid columns={2} gap="16px">
              <Field.Root invalid={Boolean(fieldErrors.goalType)}>
                <Field.Label>目標タイプ</Field.Label>
                <SegmentGroup.Root
                  size="md"
                  width="100%"
                  css={{
                    "& [data-part=item]": {
                      flex: 1,
                      justifyContent: "center",
                    },
                  }}
                  value={userInfo.goalType}
                  onValueChange={(e) =>
                    setUserInfo({
                      ...userInfo,
                      goalType: e.value ?? "",
                    })
                  }
                >
                  <SegmentGroup.Indicator />
                  <SegmentGroup.Items items={["増量", "減量", "維持"]} />
                </SegmentGroup.Root>
                <Field.ErrorText>{fieldErrors.goalType}</Field.ErrorText>
              </Field.Root>

              <Field.Root invalid={Boolean(fieldErrors.activityLevel)}>
                <Field.Label>活動レベル</Field.Label>
                <NativeSelect.Root>
                  <NativeSelect.Field
                    value={userInfo.activityLevel}
                    onChange={(e) =>
                      setUserInfo({
                        ...userInfo,
                        activityLevel: e.target.value,
                      })
                    }
                  >
                    <option value="">選択してください</option>
                    <option value="low">ほぼ運動しない</option>
                    <option value="light">軽い運動</option>
                    <option value="normal">週3〜5回運動</option>
                    <option value="high">週6回以上運動</option>
                  </NativeSelect.Field>
                  <NativeSelect.Indicator />
                </NativeSelect.Root>
                <Field.ErrorText>{fieldErrors.activityLevel}</Field.ErrorText>
              </Field.Root>
            </SimpleGrid>
            <SimpleGrid columns={2} gap="16px">
              <Field.Root invalid={Boolean(fieldErrors.weeklyGoal)}>
                <Field.Label>週間トレーニング目標</Field.Label>
                <NumberInput.Root
                  w="100%"
                  min={0}
                  value={userInfo.weeklyGoal}
                  onValueChange={(e) =>
                    setUserInfo({
                      ...userInfo,
                      weeklyGoal: e.value,
                    })
                  }
                >
                  <InputGroup endElement="回">
                    <NumberInput.Input />
                  </InputGroup>
                </NumberInput.Root>
                <Field.ErrorText>{fieldErrors.weeklyGoal}</Field.ErrorText>
              </Field.Root>
              <Field.Root invalid={Boolean(fieldErrors.targetWeight)}>
                <Field.Label>目標体重</Field.Label>
                <NumberInput.Root
                  w="100%"
                  min={0}
                  value={userInfo.targetWeight}
                  onValueChange={(e) =>
                    setUserInfo({
                      ...userInfo,
                      targetWeight: e.value,
                    })
                  }
                >
                  <InputGroup endElement="kg">
                    <NumberInput.Input />
                  </InputGroup>
                </NumberInput.Root>
                <Field.ErrorText>{fieldErrors.targetWeight}</Field.ErrorText>
              </Field.Root>
            </SimpleGrid>
          </VStack>
        </Box>

        <Box
          bg="white"
          borderWidth="1px"
          borderColor="gray.200"
          borderRadius="8px"
          p="24px"
          mx={8}
        >
          <VStack align="stretch" gap="16px">
            <Heading size="md">カロリー計算</Heading>

            <Box>
              <Text color="gray.500" fontSize="sm">
                推定消費カロリー
              </Text>
              <Text fontSize="lg" fontWeight="bold">
                {estimatedCalories}kcal
              </Text>
            </Box>

            <Box>
              <Text color="gray.500" fontSize="sm">
                目標摂取カロリー
              </Text>
              <Text fontSize="lg" fontWeight="bold">
                {displayTargetCalories}kcal
              </Text>
              <ManualCaloriModal
                setIsManualCalories={setIsManualCalories}
                targetCalories={userInfo.targetCalories}
                onChangeTargetCalories={(value) =>
                  setUserInfo({
                    ...userInfo,
                    targetCalories: value,
                  })
                }
              />
            </Box>

            <Text color="gray.500" fontSize="sm">
              性別・年齢・身長・体重・活動レベルから自動計算します
            </Text>
          </VStack>
        </Box>
      </Grid>
      {errorMessage && (
        <Text color="red.500" fontSize="sm">
          {errorMessage}
        </Text>
      )}
      <Flex mt={8} mr={8} justifyContent="end" gap="8">
        <Button px={6} onClick={onClickCancel} variant="outline">
          キャンセル
        </Button>
        <Button
          colorPalette="blue"
          loading={isLoading}
          disabled={isLoading}
          onClick={() => {
            const errors = checkRequiredField(userInfo);

            if (Object.keys(errors).length > 0) {
              setFieldErrors(errors);
              return;
            }

            setFieldErrors({});

            onClickRegister({
              userInfo,
              navigate,
              setErrorMessage,
              setIsLoading,
            });
          }}
        >
          登録して始める
        </Button>
      </Flex>
    </VStack>
  );
};
