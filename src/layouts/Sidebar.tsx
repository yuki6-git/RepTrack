import {
  FiHome,
  FiCalendar,
  FiActivity,
  FiTrendingUp,
  FiBarChart2,
  FiUser,
  FiSettings,
} from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { Box, Button, Flex } from "@chakra-ui/react";

export const Sidebar = () => {
  const navItems = [
    { label: "Dashboard", path: "/", icon: FiHome, end: true },
    { label: "Workout", path: "/workout", icon: FiCalendar },
    { label: "Training", path: "/training", icon: FiActivity },
    { label: "Weight", path: "/weight", icon: FiTrendingUp },
    { label: "Analytics", path: "/analytics", icon: FiBarChart2 },
    { label: "Profile", path: "/profile-setting", icon: FiUser },
  ];
  return (
    <Flex
      direction="column"
      minH="calc(100vh - 60px)"
      bg="blue.800"
      color="white"
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink key={item.path} to={item.path} end={item.end}>
            <Button
              width="100%"
              justifyContent="flex-start"
              gap="12px"
              bg="blue.800"
              _hover={{ bg: "blue.900" }}
              color="white"
            >
              <Icon />
              {item.label}
            </Button>
          </NavLink>
        );
      })}
    </Flex>
  );
};
