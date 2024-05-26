import { Routes, Route, Navigate } from "react-router-dom";
import MainApp from "./components/layouts/MainAppLayout";
import Dashboard from "./pages/app/Dashboard";
import Users from "./pages/app/Users";
import Login from "./pages/auth/Login";
import { useUser } from "./hooks/useUser";
import images from "./utils/constants/image";

function App() {
  const { user } = useUser();
  return (
    <div className="overflow-x-hidden bg-background h-screen">
      <Routes>
        <Route path="/auth">
          <Route path="/auth/" element={<Navigate to="/auth/login" />} />
          <Route path="/auth/login" element={<Login />} />
        </Route>
        <Route
          path="/"
          element={!user ? <Navigate to="/auth/login" /> : <MainApp />}
        >
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
        </Route>
      </Routes>
      <img
        src={images.bottomVector}
        alt=""
        className="absolute bottom-0 left-0 w-full"
      />
    </div>
  );
}

export default App;
