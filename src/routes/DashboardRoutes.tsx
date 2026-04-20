import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import CandidateDashboard from "../pages/dashboard/CandidateDashboard";
import EmployerDashboard from "../pages/dashboard/EmployerDashboard";
import Jobs from "../pages/dashboard/Jobs";
import Profile from "../pages/dashboard/Profile";
import Settings from "../pages/dashboard/Settings";
import Onboarding from "../pages/dashboard/Onboarding";
import { useAuth } from "../context/AuthContext";

const DashboardIndexDispatcher = () => {
  const { role } = useAuth();
  if (role === 'Candidate') return <CandidateDashboard />;
  if (role === 'Employer' || role === 'Recruiter') return <Navigate to="/dashboard/pipeline" replace />;
  return <CandidateDashboard />;
};

export const DashboardRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<DashboardIndexDispatcher />} />
        <Route path="pipeline" element={<EmployerDashboard />} />
        <Route path="jobs" element={<Jobs />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
        <Route path="onboarding" element={<Onboarding />} />
        {/* Catch-all to prevent 404s within dashboard */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>
    </Routes>
  );
};
