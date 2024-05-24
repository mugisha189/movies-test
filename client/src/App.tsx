import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Home from "./pages/app/Home";
import Login from "./pages/auth/Login";
import { useUser } from "./hooks/useUser";
import images from "./utils/constants/image";
import AddMovie from "./pages/app/AddMovie";
import EditMovie from "./pages/app/EditMovie";

function App() {
  const { user } = useUser();
  return (
    <div className="overflow-x-hidden bg-background h-screen text-white">
      <Routes>
        <Route
          path="/"
          element={!user ? <Navigate to={"/login"} /> : <Outlet />}
        >
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddMovie />} />
          <Route path="/edit/:id" element={<EditMovie />} />
        </Route>

        <Route
          path="/login"
          element={user ? <Navigate to={"/"} /> : <Login />}
        />
      </Routes>
      <img
        src={images.bottomVector}
        alt=""
        className="absolute bottom-0 left-0 w-full z-0"
      />
    </div>
  );
}

export default App;
