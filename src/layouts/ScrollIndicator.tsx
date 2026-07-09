import { Box, Text } from "@chakra-ui/react";

export const ScrollIndicator = () => {
  const onClickScroll = () => {
    window.scrollBy({
      top: window.innerHeight * 0.75,
      behavior: "smooth",
    });
  };

  return (
    <Box
      role="button"
      tabIndex={0}
      aria-label="下へスクロール"
      className="scroll-indicator"
      onClick={onClickScroll}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          onClickScroll();
        }
      }}
      position="fixed"
      left={{ base: "16px", md: "calc(15% + 20px)" }}
      bottom={{ base: "18px", md: "24px" }}
      zIndex="sticky"
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap="10px"
      color="blue.800"
      bg="transparent"
      border="0"
      cursor="pointer"
      userSelect="none"
      p="0"
      _hover={{ color: "blue.600" }}
    >
      <Box w="10px" h="10px" borderRadius="full" bg="currentColor" />
      <Text
        fontSize="12px"
        fontWeight="800"
        letterSpacing="0"
        lineHeight="1"
        style={{ writingMode: "vertical-rl" }}
      >
        SCROLL
      </Text>
      <Box
        className="scroll-indicator__line"
        w="2px"
        h={{ base: "52px", md: "72px" }}
        bg="currentColor"
      />
    </Box>
  );
};
