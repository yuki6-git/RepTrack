import { Box, Heading, Text, Button, Flex } from "@chakra-ui/react"

export const Login = () => {
  return (
    <>
      <Box>
        <Heading>RepTrack</Heading>
        <Text>日々のトレーニングを管理してモチベーションを継続させよう！！</Text>
      </Box>

      <Flex>
        <Button>ログイン</Button>
        <Button>新規登録</Button>
      </Flex>
    </>
  );
};
