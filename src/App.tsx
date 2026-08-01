import { Navigate, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import PortalLayout from "./layouts/PortalLayout";
import DashboardPage from "./pages/DashboardPage";
import StoresPage from "./pages/StoresPage";
import StoreDetailPage from "./pages/StoreDetailPage";
import ApprovalsPage from "./pages/ApprovalsPage";
import PlaceholderPage from "./pages/PlaceholderPage";
import ProgramsPage from "./pages/ProgramsPage";
import ProgramDetailPage from "./pages/ProgramDetailPage";
import ExecutionPage from "./pages/ExecutionPage";
import ProtectedRoute from "./features/auth/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/portal" element={<PortalLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="stores" element={<StoresPage />} />
          <Route path="stores/:storeId" element={<StoreDetailPage />} />
          <Route path="approvals" element={<ApprovalsPage />} />
          <Route path="assets" element={<PlaceholderPage title="Asset Library" />} />
          <Route path="programs" element={<ProgramsPage />} />
          <Route path="programs/:programId" element={<ProgramDetailPage />} />
          <Route path="execution" element={<ExecutionPage />} />
          <Route path="reports" element={<PlaceholderPage title="Reports" />} />
          <Route path="assistant" element={<PlaceholderPage title="RetailVision AI" />} />
          <Route path="admin" element={<PlaceholderPage title="Administration" />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
