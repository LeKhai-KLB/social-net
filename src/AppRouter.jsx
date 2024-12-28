import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import ProfilePage from "./pages/profile";
import ActivityPage from "./pages/activity";

export default function AppRouter({ children }) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={children}>
          <Route index element={<Navigate to="profile" replace />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="activity" element={<ActivityPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
