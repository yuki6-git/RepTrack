import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";


const settings = [
  "パスワードの変更",
  "通知設定",
  "データのエクスポート",
  "アカウントの削除",
];

export const ProfileSetting = () => {
  const [profile, setProfile] = useState(
    {
      username: "taro_fitness",
      email: "taro@example.com",
      targetWeight: "60.0kg",
      gender: "男性",
      birthday: "1998/04/15",
    },
  );
  const [weeklyGoalCount, setWeeklyGoalCount] = useState(3);
  return (
    <VStack align="stretch" gap="24px">
      <Heading size="xl">プロフィール</Heading>

      <SimpleGrid columns={{ base: 1, lg: 2 }} gap="24px">
        <Box p="24px" bg="white" borderRadius="8px" borderWidth="1px">
          <Heading size="md" mb="24px">
            ユーザー情報
          </Heading>
          {
            
          }
          <VStack gap="24px">
            <Avatar.Root size="2xl">
              <Avatar.Fallback name={profile.username} />
            </Avatar.Root>

            <VStack align="stretch" gap="16px" width="100%">
              <Flex justify="space-between">
                <Text color="gray.500">ユーザー名</Text>
                <Text fontWeight="bold">{profile.username}</Text>
              </Flex>

              <Flex justify="space-between">
                <Text color="gray.500">メールアドレス</Text>
                <Text fontWeight="bold">{profile.email}</Text>
              </Flex>

              <Flex justify="space-between">
                <Text color="gray.500">目標体重</Text>
                <Text fontWeight="bold">{profile.targetWeight}</Text>
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

            <Button variant="outline">プロフィールを編集</Button>
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
                <Heading size="xl">{profile.targetWeight}</Heading>
                <Text fontWeight="bold">kg</Text>
              </Flex>
            </Flex>

            <Flex justify="space-between" align="center" mb="24px">
              <Text color="gray.500">トレーニング目標</Text>
              <Flex align="baseline" gap="6px">
                <Heading size="xl">{weeklyGoalCount}</Heading>
                <Text fontWeight="bold">回</Text>
              </Flex>
            </Flex>

            <Button variant="outline">目標を編集</Button>
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
