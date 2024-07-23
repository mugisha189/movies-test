import { Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "./components/layouts/AuthLayout";
import MainApp from "./components/layouts/MainAppLayout";
import Dashboard from "./pages/app/Dashboard";
import Users from "./pages/app/Users";
import Categories from "./pages/app/Categories";
import Login from "./pages/auth/Login";
import { useUser } from "./hooks/useUser";

function App() {
  const { user } = useUser();
  return (
    <div className="overflow-x-hidden">
      <Routes>
        <Route
          path="/auth"
          element={user ? <Navigate to="/" /> : <AuthLayout />}
        >
          <Route path="/auth/" element={<Navigate to="/auth/login" />} />
          <Route path="/auth/login" element={<Login />} />
        </Route>
        <Route
          path="/"
          element={!user ? <Navigate to="/auth/login" /> : <MainApp />}
        >
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/categories" element={<Categories />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
