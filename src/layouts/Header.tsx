import { Flex, Grid, Heading, Button, Text } from "@chakra-ui/react";
import { FaUserCircle } from "react-icons/fa";

export const Header = () => {
  return (
    <Grid
      templateColumns="1fr auto 1fr"
      color="white"
      alignItems="center"
      h="60px"
      bg="blue.900"
    >
      <Heading ml={4} textAlign="left">RepTrack</Heading>
      <Text fontWeight="bold">トレーニングメニュー</Text>
      <Flex justify="flex-end" gap="16px" align="center">
        <FaUserCircle size={32} />
        <Button mx={4}>ログアウト</Button>
      </Flex>
    </Grid>
  );
};
