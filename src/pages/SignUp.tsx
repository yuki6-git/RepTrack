import {
  Flex,
  Box,
  VStack,
  Heading,
  Input,
  Button,
  Field,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { signUp } from "../api/authApi";

export const SignUp = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onClickSignUp = async () => {
    setIsSubmitted(true);
    setErrorMessage("");
    setMessage("");

    if (!email || !password) {
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await signUp(email, password);
      if (error) {
        setErrorMessage("新規登録に失敗しました");
        return;
      }
      setMessage(
        "確認メールを送信しました。メール確認後にログインしてください。",
      );
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
          <Box textAlign="center">
            <Heading size="2xl" color="blue.900">
              新規登録
            </Heading>
          </Box>

          <VStack align="stretch" gap="16px">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onClickSignUp();
              }}
            ></form>
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
                <Field.ErrorText>パスワードを入力してください</Field.ErrorText>
              </Field.Root>
            </Box>
          </VStack>

          {errorMessage && (
            <Text color="red.500" fontSize="sm">
              {errorMessage}
            </Text>
          )}

          {message && (
            <Text color="green.600" fontSize="sm">
              {message}
            </Text>
          )}
          <Button
            h="48px"
            bg="blue.700"
            color="white"
            _hover={{ bg: "blue.800" }}
            loading={isLoading}
            disabled={isLoading || !email || !password}
            type="submit"
          >
            登録
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
};
