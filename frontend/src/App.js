import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import ContactsPage from "./pages/ContactsPage/ContactsPage";
import PlanningPage from "./pages/PlanningPage/PlanningPage";
import TestPage from "./pages/TestPage/TestPage";
import DroneListPage from "./pages/DroneListPage/DroneListPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import { AuthProvider } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/test" element={<TestPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/contacts"
            element={
              <ProtectedRoute>
                <ContactsPage />
              </ProtectedRoute>
            }
          />
          <Route path="/dronelist" element={<DroneListPage />} />
          <Route
            path="/planning"
            element={
              <ProtectedRoute>
                <PlanningPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/profile" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
