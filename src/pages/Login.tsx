import { useNavigate } from "react-router-dom";
import { Box, Heading, Text, Button, Flex, VStack, Input } from "@chakra-ui/react";

export const Login = () => {
  const navigate = useNavigate();
  const onClickLogin = () => {
    navigate("/");
  };
  return (
    <Flex minH="100vh" bg="blue.900" align="center" justify="center" px="24px">
      <Box
        w="100%"
        maxW="420px"
        bg="white"
        borderRadius="12px"
        p="32px"
        boxShadow="xl"
      >
        <VStack align="stretch" gap="24px">
          <Box textAlign="center">
            <Heading size="2xl" color="blue.900">
              RepTrack
            </Heading>
            <Text mt="12px" color="gray.600">
              日々のトレーニングを記録して、成長を見える化しよう
            </Text>
          </Box>

          <VStack align="stretch" gap="16px">
            <Box>
              <Text mb="8px" fontWeight="bold">
                メールアドレス
              </Text>
              <Input placeholder="example@email.com" />
            </Box>

            <Box>
              <Text mb="8px" fontWeight="bold">
                パスワード
              </Text>
              <Input type="password" placeholder="password" />
            </Box>
          </VStack>

          <Button
            h="48px"
            bg="blue.700"
            color="white"
            _hover={{ bg: "blue.800" }}
            onClick={onClickLogin}
          >
            ログイン
          </Button>

          <Button variant="outline" h="48px">
            新規登録
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
};
