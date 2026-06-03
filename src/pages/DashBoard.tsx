import { Text, Box, Button, Heading, VStack, Flex } from "@chakra-ui/react";

export const DashBoard = () => {
  return (
    <VStack gap="24px" align="stretch">
      <Box p="24px" borderRadius="16px" boxShadow="md">
        <Heading size="xl" mb="8px">
          Weight
        </Heading>
        <Text mb="20px">現在の体重は55kgです。</Text>
        <Text mb="20px">目標まであと+5kgです。</Text>
        <Flex mt="16px" justify="flex-end">
          <Button>詳細ページ</Button>
        </Flex>
      </Box>

      <Box p="24px" borderRadius="16px" boxShadow="md">
        <Heading size="xl" mb="8px">
          Weekly Goal
        </Heading>
        <Text mb="20px">今週は3回トレーニングしました</Text>
        <Text mb="20px">3週連続目標達成です！</Text>
        <Flex mt="16px" justify="flex-end">
          <Button>詳細ページ</Button>
        </Flex>
      </Box>

      <Box p="24px" borderRadius="16px" boxShadow="md">
        <Heading size="xl" mb="8px">
          Today's Training
        </Heading>
        <Text mb="20px">今日は背中トレーニングの日です。</Text>
        <Flex mt="16px" justify="flex-end">
          <Button>詳細ページ</Button>
        </Flex>
      </Box>

      <Box p="24px" borderRadius="16px" boxShadow="md">
        <Heading size="xl" mb="8px">
          PRUPDATE
        </Heading>
        <Text mb="20px">ベンチプレスのMAX重量が75kgになりました!</Text>
        <Flex mt="16px" justify="flex-end">
          <Button>詳細ページ</Button>
        </Flex>
      </Box>
    </VStack>
  );
};
