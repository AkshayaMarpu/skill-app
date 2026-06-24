import { Routes, Route, Navigate } from "react-router-dom";

import Splash from "./pages/Splash";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Profile from "./pages/Profile";
import Users from "./pages/Users";
import Chat from "./pages/Chat";
import Requests from "./pages/Requests";
import Meeting from "./pages/Meeting";
import Notifications from "./pages/Notifications";

function AppRoutes() {
  return (
    <Routes>

      {/* Landing / Splash */}
      <Route path="/" element={<Splash />} />

      {/* Authentication */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Main Pages */}
      <Route path="/home" element={<Home />} />
      <Route path="/profile" element={<Profile />} />

      {/* Features */}
      <Route path="/users" element={<Users />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/chat/:id" element={<Chat />} />
      <Route path="/requests" element={<Requests />} />
      <Route path="/meeting" element={<Meeting />} />
      <Route path="/notifications" element={<Notifications />} />

      {/* Invalid Route Redirect */}
      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />

    </Routes>
  );
}

export default AppRoutes;