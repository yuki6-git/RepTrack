import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box minH="calc(100vh - 108px)" display="grid" placeItems="center">
      <VStack
        gap="20px"
        textAlign="center"
        bg="white"
        borderWidth="1px"
        borderRadius="8px"
        p="48px"
      >
        <Text fontSize="6xl" fontWeight="bold" color="blue.700">
          404
        </Text>

        <Heading size="xl">ページが見つかりません</Heading>

        <Text color="gray.500">
          URLが間違っているか、ページが移動した可能性があります。
        </Text>

        <Button colorPalette="blue" onClick={() => navigate("/")}>
          Dashboardへ戻る
        </Button>
      </VStack>
    </Box>
  );
};
