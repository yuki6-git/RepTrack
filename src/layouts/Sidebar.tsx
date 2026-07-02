import {
  FiHome,
  FiCalendar,
  FiActivity,
  FiTrendingUp,
  FiBarChart2,
  FiUser,
} from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { Button } from "@chakra-ui/react";

type Props = {
  variant?: "sidebar" | "drawer";
};
export const Sidebar = (props: Props) => {
  const { variant } = props;
  const isMobile = variant === "drawer";
  const navItems = [
    { label: "Dashboard", path: "/", icon: FiHome, end: true },
    { label: "Workout", path: "/workout", icon: FiCalendar },
    { label: "Training", path: "/training", icon: FiActivity },
    { label: "Weight", path: "/weight", icon: FiTrendingUp },
    { label: "Analytics", path: "/analytics", icon: FiBarChart2 },
    { label: "Profile", path: "/profile-setting", icon: FiUser },
  ];
  return (
    <>
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink key={item.path} to={item.path} end={item.end}>
            {() => (
              <Button
                width="100%"
                height="52px"
                justifyContent="flex-start"
                gap="12px"
                variant="ghost"
                borderRadius="0"
                color={isMobile ? "blue.700" : "white"}
                _hover={{
                  bg: isMobile ? "gray.100" : "blue.900",
                }}
              >
                <Icon />
                {item.label}
              </Button>
            )}
          </NavLink>
        );
      })}
    </>
  );
};
