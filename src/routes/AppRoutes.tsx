import { Route, Routes } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { Dashboard } from "../pages/Dashboard";
import { Workout } from "../pages/Workout";
import { Exercise } from "../pages/Exercise";
import { Weight } from "../pages/Weight";
import { Analytics } from "../pages/Analytics";
import { ProfileSetting } from "../pages/ProfileSetting";
import { Login } from "../pages/Login";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/workout" element={<Workout />} />
        <Route path="/exercise" element={<Exercise />} />
        <Route path="/weight" element={<Weight />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/profile-setting" element={<ProfileSetting />} />
      </Route>
    </Routes>
  );
};