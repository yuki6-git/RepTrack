import { Route, Routes } from "react-router-dom";
import { AuthGuard } from "../components/auth/AuthGuard";
import { lazy, Suspense } from "react";

import { MainLayout } from "../layouts/MainLayout";
import { Flex, Text } from "@chakra-ui/react";
const Dashboard = lazy(() =>
  import("../pages/Dashboard").then((module) => ({
    default: module.Dashboard,
  })),
);
const Workout = lazy(() =>
  import("../pages/Workout").then((module) => ({
    default: module.Workout,
  })),
);
const Training = lazy(() =>
  import("../pages/Training").then((module) => ({
    default: module.Training,
  })),
);
const Weight = lazy(() =>
  import("../pages/Weight").then((module) => ({
    default: module.Weight,
  })),
);
const Analytics = lazy(() =>
  import("../pages/Analytics").then((module) => ({
    default: module.Analytics,
  })),
);
const ProfileSetting = lazy(() =>
  import("../pages/ProfileSetting").then((module) => ({
    default: module.ProfileSetting,
  })),
);
const Login = lazy(() =>
  import("../pages/Login").then((module) => ({
    default: module.Login,
  })),
);
const Register = lazy(() =>
  import("../pages/Register").then((module) => ({
    default: module.Register,
  })),
);
const SignUp = lazy(() =>
  import("../pages/SignUp").then((module) => ({
    default: module.SignUp,
  })),
);
const PageLoading = () => (
  <Flex minH="100vh" align="center" justify="center">
    <Text color="gray.500">読み込み中...</Text>
  </Flex>
);
export const AppRoutes = () => {
  return (
    <Suspense fallback={<PageLoading />}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/register" element={<Register />} />

        <Route
          element={
            <AuthGuard>
              <MainLayout />
            </AuthGuard>
          }
        >
          <Route path="/" element={<Dashboard />} />
          <Route path="/workout" element={<Workout />} />
          <Route path="/training" element={<Training />} />
          <Route path="/weight" element={<Weight />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/profile-setting" element={<ProfileSetting />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
