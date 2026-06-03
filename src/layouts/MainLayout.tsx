import { Box, Grid } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

export const MainLayout = () => {
  return (
    <Box minH="100vh" bg="#f6f8fb">
      <Header />

      <Grid templateColumns="15% 85%" minH="calc(100vh - 60px)">
        <Sidebar />
        <Box p="24px">
          <Outlet />
        </Box>
      </Grid>
    </Box>
  );
};
