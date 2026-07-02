import { Box, Flex, Grid } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

export const MainLayout = () => {
  return (
    <Box minH="100vh" bg="#f6f8fb">
      <Header />

      <Grid
        templateColumns={{ base: "1fr", md: "15% 85%" }}
        minH="calc(100vh - 60px)"
      >
        <Flex
          display={{ base: "none", md: "block" }}
          direction="column"
          minH="calc(100vh - 60px)"
          bg="blue.800"
          color="white"
        >
          <Sidebar />
        </Flex>
        <Box p="24px" minW={0} overflowX="hidden">
          <Outlet />
        </Box>
      </Grid>
    </Box>
  );
};
