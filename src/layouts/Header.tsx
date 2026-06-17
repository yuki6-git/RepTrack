import { Flex, Grid, Heading, Button, Spacer } from "@chakra-ui/react";
import { FaUserCircle } from "react-icons/fa";

export const Header = () => {
  return (
    <Flex
      color="white"
      alignItems="center"
      h="60px"
      bg="blue.900"
      borderBottomWidth="1px"
      borderColor="gray.400"
    >
      <Heading ml={4} textAlign="left">
        RepTrack
      </Heading>
      <Spacer />
      <FaUserCircle size={32} />
      <Button mx={4}>ログアウト</Button>
    </Flex>
  );
};
