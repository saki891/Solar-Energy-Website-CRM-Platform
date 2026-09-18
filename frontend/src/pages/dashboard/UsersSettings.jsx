import { Navigate } from "react-router-dom";

// Legacy component fallback - redirects to /dashboard/users
export default function UsersSettings() {
  return <Navigate to="/dashboard/users" replace />;
}
