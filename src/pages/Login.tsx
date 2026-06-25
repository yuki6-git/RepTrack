import { useNavigate } from "react-router-dom";
import {
  Box,
  Heading,
  Text,
  Button,
  Flex,
  VStack,
  Input,
  Field,
} from "@chakra-ui/react";
import { useState } from "react";
import { fetchUserById, signIn } from "../api/authApi";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const onClickLogin = async () => {
    setErrorMessage("");
    setIsSubmitted(true);

    if (!email || !password) {
      return;
    }

    setIsLoading(true);

    try {
      const { data: authData, error: signInError } = await signIn(
        email,
        password,
      );

      if (signInError || !authData.user) {
        setErrorMessage("ログインに失敗しました");
        return;
      }

      const userId = authData.user.id;
      const { data: user, error: userError } = await fetchUserById(userId);
      if (userError) {
        setErrorMessage("ユーザー情報の確認に失敗しました");
        return;
      }
      if (!user) {
        navigate("/register");
        return;
      }
      navigate("/");
    } finally {
      setIsLoading(false);
    }
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
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onClickLogin();
            }}
          >
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
                <Field.Root invalid={Boolean(isSubmitted && !email)}>
                  <Field.Label mb="8px" fontWeight="bold">
                    メールアドレス
                  </Field.Label>
                  <Input
                    value={email}
                    placeholder="example@email.com"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Field.ErrorText>
                    メールアドレスを入力してください
                  </Field.ErrorText>
                </Field.Root>
              </Box>

              <Box>
                <Field.Root invalid={Boolean(isSubmitted && !password)}>
                  <Field.Label mb="8px" fontWeight="bold">
                    パスワード
                  </Field.Label>
                  <Input
                    value={password}
                    type="password"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Field.ErrorText>
                    パスワードを入力してください
                  </Field.ErrorText>
                </Field.Root>
              </Box>
            </VStack>
            {errorMessage && (
              <Text color="red.500" fontSize="sm">
                {errorMessage}
              </Text>
            )}
            <Button
              loading={isLoading}
              disabled={isLoading || !email || !password}
              h="48px"
              bg="blue.700"
              color="white"
              _hover={{ bg: "blue.800" }}
              type="submit"
            >
              ログイン
            </Button>

            <Button
              variant="outline"
              h="48px"
              onClick={() => {
                navigate("/signup");
              }}
              type="button"
            >
              新規登録の方はこちら
            </Button>
          </form>
        </VStack>
      </Box>
    </Flex>
  );
};
