import {
  Avatar,
  Box,
  Flex,
  Heading,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { UserProfileModal } from "../components/UserProfileModal";
import { UserGoalsModal } from "../components/UserGoalsModal";
import type { Profile } from "../types/profile";
import type { UserGoals } from "../types/UserGoals";

const settings = [
  "パスワードの変更",
  "通知設定",
  "データのエクスポート",
  "アカウントの削除",
];

export const ProfileSetting = () => {
  const [profile, setProfile] = useState<Profile>({
    username: "taro_fitness",
    email: "taro@example.com",
    gender: "男性",
    birthday: "1998/04/15",
  });
  const [userGoals, setUserGoals] = useState<UserGoals>({
    targetWeight: 60,
    weeklyGoal: 3,
  });

  return (
    <VStack align="stretch" gap="24px">
      <Heading size="xl">プロフィール</Heading>

      <SimpleGrid columns={{ base: 1, lg: 2 }} gap="24px">
        <Box p="24px" bg="white" borderRadius="8px" borderWidth="1px">
          <Heading size="md" mb="24px">
            ユーザー情報
          </Heading>
          {}
          <VStack gap="80px">
            <Avatar.Root size="2xl" mt={10}>
              <Avatar.Fallback name={profile.username} />
            </Avatar.Root>

            <VStack align="stretch" gap="30px" width="100%">
              <Flex justify="space-between">
                <Text color="gray.500">ユーザー名</Text>
                <Text fontWeight="bold">{profile.username}</Text>
              </Flex>

              <Flex justify="space-between">
                <Text color="gray.500">メールアドレス</Text>
                <Text fontWeight="bold">{profile.email}</Text>
              </Flex>

              <Flex justify="space-between">
                <Text color="gray.500">性別</Text>
                <Text fontWeight="bold">{profile.gender}</Text>
              </Flex>

              <Flex justify="space-between">
                <Text color="gray.500">生年月日</Text>
                <Text fontWeight="bold">{profile.birthday}</Text>
              </Flex>
            </VStack>

            <UserProfileModal profile={profile} setProfile={setProfile} />
          </VStack>
        </Box>

        <VStack align="stretch" gap="24px">
          <Box p="24px" bg="white" borderRadius="8px" borderWidth="1px">
            <Heading size="md" mb="20px">
              目標設定
            </Heading>

            <Flex justify="space-between" align="center" mb="20px">
              <Text color="gray.500">目標体重</Text>
              <Flex align="baseline" gap="6px">
                <Heading size="xl">{userGoals.targetWeight}</Heading>
                <Text fontWeight="bold">kg</Text>
              </Flex>
            </Flex>

            <Flex justify="space-between" align="center" mb="24px">
              <Text color="gray.500">トレーニング目標</Text>
              <Flex align="baseline" gap="6px">
                <Heading size="xl">{userGoals.weeklyGoal}</Heading>
                <Text fontWeight="bold">回</Text>
              </Flex>
            </Flex>

            <UserGoalsModal userGoals={userGoals} setUserGoals={setUserGoals}/>
          </Box>

          <Box p="24px" bg="white" borderRadius="8px" borderWidth="1px">
            <Heading size="md" mb="16px">
              その他の設定
            </Heading>

            <VStack align="stretch" gap="0">
              {settings.map((setting) => (
                <Flex
                  key={setting}
                  justify="space-between"
                  align="center"
                  py="16px"
                  borderBottomWidth="1px"
                  _last={{ borderBottomWidth: "0" }}
                >
                  <Text>{setting}</Text>
                  <Text color="gray.500">{">"}</Text>
                </Flex>
              ))}
            </VStack>
          </Box>
        </VStack>
      </SimpleGrid>
    </VStack>
  );
};
