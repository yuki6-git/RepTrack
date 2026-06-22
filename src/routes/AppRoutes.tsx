import { Route, Routes } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { Dashboard } from "../pages/Dashboard";
import { Workout } from "../pages/Workout";
import { Training } from "../pages/Training";
import { Weight } from "../pages/Weight";
import { Analytics } from "../pages/Analytics";
import { ProfileSetting } from "../pages/ProfileSetting";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { SignUp } from "../pages/SignUp";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/register" element={<Register />} />
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/workout" element={<Workout />} />
        <Route path="/training" element={<Training />} />
        <Route path="/weight" element={<Weight />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/profile-setting" element={<ProfileSetting />} />
        
      </Route>
    </Routes>
  );
};
