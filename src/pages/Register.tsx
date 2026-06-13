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
} from "@chakra-ui/react";
import { useState } from "react";
import { useCalorieCalculation } from "../hooks/register/useCalorieCalculation";
import { ManualCaloriModal } from "../components/register/ManualcaloriModal";
import { useNavigate } from "react-router-dom";
import type { UserInfo } from "../types/UserInfo";

export const Register = () => {
  const initialUserInfo = {
    username: "",
    email: "",
    gender: "",
    birthday: "",
    height: "",
    weight: "",
    goalType: "",
    activityLevel: "",
    weeklyGoal: "",
    targetWeight: "",
  };

  const [userInfo, setUserInfo] = useState<UserInfo>(initialUserInfo);
  const [isManualCalories, setIsManualCalories] = useState(false);
  const [manualTargetCalories, setManualTargetCalories] = useState("");

  const { estimatedCalories, targetCalories } = useCalorieCalculation({
    userInfo,
  });

  const displayTargetCalories = isManualCalories
    ? manualTargetCalories
    : String(targetCalories);

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
      <Box>
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
        gap="24px"
        w="100%"
      >
        <Box
          bg="white"
          borderWidth="1px"
          borderColor="gray.200"
          borderRadius="8px"
          p="24px"
        >
          <VStack align="stretch" w="100%">
            <Heading size="md">ユーザー情報</Heading>
            <SimpleGrid columns={2} gap="16px">
              <Box>
                <Text color="gray.600" fontSize="sm" mb="6px">
                  ユーザー名
                </Text>
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
              </Box>
              <Box>
                <Text color="gray.600" fontSize="sm" mb="6px">
                  メールアドレス
                </Text>
                <Input
                  type="email"
                  placeholder="メールアドレスを入力"
                  value={userInfo.email}
                  onChange={(e) =>
                    setUserInfo({
                      ...userInfo,
                      email: e.target.value,
                    })
                  }
                />
              </Box>
            </SimpleGrid>
            <SimpleGrid columns={2} gap="16px">
              <Box>
                <Text color="gray.600" fontSize="sm" mb="6px">
                  性別
                </Text>
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
              </Box>
              <Box>
                <Text color="gray.600" fontSize="sm" mb="6px">
                  生年月日
                </Text>
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
              </Box>
            </SimpleGrid>
            <SimpleGrid columns={2} gap="16px">
              <Box>
                <Text color="gray.600" fontSize="sm" mb="6px">
                  身長
                </Text>
                <NumberInput.Root
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
              </Box>
              <Box>
                <Text color="gray.600" fontSize="sm" mb="6px">
                  体重
                </Text>
                <NumberInput.Root
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
              </Box>
            </SimpleGrid>
            <SimpleGrid columns={2} gap="16px">
              <Box>
                <Text color="gray.600" fontSize="sm" mb="6px">
                  目標タイプ
                </Text>
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
              </Box>
              <Box>
                <Text color="gray.600" fontSize="sm" mb="6px">
                  活動レベル
                </Text>
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
              </Box>
            </SimpleGrid>
            <SimpleGrid columns={2} gap="16px">
              <Box>
                <Text color="gray.600" fontSize="sm" mb="6px">
                  週間トレーニング目標
                </Text>
                <NumberInput.Root
                  min={0}
                  max={7}
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
              </Box>
              <Box>
                <Text color="gray.600" fontSize="sm" mb="6px">
                  目標体重
                </Text>
                <NumberInput.Root
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
              </Box>
            </SimpleGrid>
          </VStack>
        </Box>

        <Box
          bg="white"
          borderWidth="1px"
          borderColor="gray.200"
          borderRadius="8px"
          p="24px"
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
                目標カロリー
              </Text>
              <Text fontSize="lg" fontWeight="bold">
                {displayTargetCalories}kcal
              </Text>
              <ManualCaloriModal
                setIsManualCalories={setIsManualCalories}
                setManualTargetCalories={setManualTargetCalories}
                manualTargetCalories={manualTargetCalories}
              />
            </Box>

            <Text color="gray.500" fontSize="sm">
              性別・年齢・身長・体重・活動レベルから自動計算します
            </Text>
          </VStack>
        </Box>
      </Grid>
      <Flex mt={8} justifyContent="end" gap="4">
        <Button onClick={onClickCancel} variant="outline">
          キャンセル
        </Button>
        <Button colorPalette="blue">登録して始める</Button>
      </Flex>
    </VStack>
  );
};
