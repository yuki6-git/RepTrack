import {
  Avatar,
  Box,
  Flex,
  Heading,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";

import { UserProfileModal } from "../components/profile/UserProfileModal";
import { UserGoalsModal } from "../components/profile/UserGoalsModal";
import { useFetchUserProfile } from "../hooks/profileSetting/useFetchuserProfile";
import { useUpdateUserProfile } from "../hooks/profileSetting/useUpdateUSerProfile";
import type { UserGoalsForm, UserProfileSettingForm } from "../types/UserInfo";

const settings = [
  "パスワードの変更",
  "通知設定",
  "データのエクスポート",
  "アカウントの削除",
];

export const ProfileSetting =  () => {
  const {
    userInfo,
    profileSetting,
    userGoals,
    isLoading,
    errorMessage,
    fetchUserProfile,
  } = useFetchUserProfile();

  const {  updateProfileSetting,
    updateGoals, } = useUpdateUserProfile();

 const onSaveProfile = async (form: UserProfileSettingForm) => {
  const success = await updateProfileSetting(form);

  if (!success) {
    return false;
  }

  await fetchUserProfile();
  return true;
};

const onSaveGoals = async (form: UserGoalsForm) => {
  const success = await updateGoals(form);

  if (!success) {
    return false;
  }

  await fetchUserProfile();
  return true;
};

  return (
    <VStack align="stretch" gap="24px">
      <Heading size="xl">プロフィール</Heading>
      {isLoading && <Text>読み込み中...</Text>}

      {errorMessage && <Text color="red.500">{errorMessage}</Text>}

      <SimpleGrid columns={{ base: 1, lg: 2 }} gap="24px">
        <Box p="24px" bg="white" borderRadius="8px" borderWidth="1px">
          <Heading size="md" mb="24px">
            ユーザー情報
          </Heading>
          {}
          <VStack gap="80px">
            <Avatar.Root size="2xl" mt={10}>
              <Avatar.Fallback name={userInfo?.username} />
            </Avatar.Root>

            <VStack align="stretch" gap="30px" width="100%">
              <Flex justify="space-between">
                <Text color="gray.500">ユーザー名</Text>
                <Text fontWeight="bold">{userInfo?.username}</Text>
              </Flex>

              <Flex justify="space-between">
                <Text color="gray.500">メールアドレス</Text>
                <Text fontWeight="bold">{userInfo?.email}</Text>
              </Flex>

              <Flex justify="space-between">
                <Text color="gray.500">性別</Text>
                <Text fontWeight="bold">{profileSetting?.gender}</Text>
              </Flex>

              <Flex justify="space-between">
                <Text color="gray.500">生年月日</Text>
                <Text fontWeight="bold">{profileSetting?.birthday}</Text>
              </Flex>
            </VStack>

            <UserProfileModal
              userInfo={userInfo}
              profileSetting={profileSetting}
              onSave={onSaveProfile}
            />
          </VStack>
        </Box>

        <VStack align="stretch" gap="24px">
          <Box p="24px" bg="white" borderRadius="8px" borderWidth="1px">
            <Heading size="md" mb="20px">
              目標設定
            </Heading>
            {isLoading && <Text>読み込み中...</Text>}
            {errorMessage && <Text color="red.500">{errorMessage}</Text>}

            <Flex justify="space-between" align="center" mb="20px">
              <Text color="gray.500">目標体重</Text>
              <Flex align="baseline" gap="6px">
                <Heading size="xl">{userGoals?.target_weight}</Heading>
                <Text fontWeight="bold">kg</Text>
              </Flex>
            </Flex>

            <Flex justify="space-between" align="center" mb="24px">
              <Text color="gray.500">トレーニング目標</Text>
              <Flex align="baseline" gap="6px">
                <Heading size="xl">{userGoals?.weekly_goal}</Heading>
                <Text fontWeight="bold">回</Text>
              </Flex>
            </Flex>

            <UserGoalsModal userGoals={userGoals} onSave={onSaveGoals} />
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
