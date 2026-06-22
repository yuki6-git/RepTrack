import { Flex, Heading, Button, Spacer } from "@chakra-ui/react";
import { FaUserCircle } from "react-icons/fa";
import { signOut } from "../api/authApi";
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();

export const Header = () => {
  const onClickLogout = async () => {
    const isCancel = window.confirm("ログアウトしますか？");
    if (!isCancel) {
      return;
    }
    const { error } = await signOut();

    if (!error) {
      navigate("/login");
    }
  };
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
      <Button onClick={onClickLogout} mx={4}>
        ログアウト
      </Button>
    </Flex>
  );
};
