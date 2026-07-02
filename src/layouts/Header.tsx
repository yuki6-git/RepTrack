import { Flex, Heading, Button, Spacer, Box } from "@chakra-ui/react";
import { FaUserCircle } from "react-icons/fa";
import { signOut } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import { MenuDrawer } from "./MenuDrawer";

export const Header = () => {
  const navigate = useNavigate();

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
      <Box display={{ base: "block", md: "none" }}>
        <MenuDrawer />
      </Box>
      <Heading ml={{ base: 0, md: 4 }} textAlign="left">
        RepTrack
      </Heading>

      <Spacer />
      <Button
        size="2xl"
        bg="transparent"
        onClick={() => navigate("/profile-setting")}
      >
        <FaUserCircle />
      </Button>

      <Button onClick={onClickLogout} mx={4}>
        ログアウト
      </Button>
    </Flex>
  );
};
