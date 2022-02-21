import logo from "./logo.svg";

import Registration from "./components/Registration";
import { Route, Routes, useLocation } from "react-router-dom";

import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ChangePassword from "./components/ChangePassword";
import CreateTask from "./components/CreateTable";
import MyProfile from "./components/MyProfile";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute";
import { useSelector } from "react-redux";
// import DefaultContainer from "./components/DefaultContainer";

function App() {
  const { pathname } = useLocation();
  const { isLoggedIn } = useSelector((state) => state.users);
  console.log(isLoggedIn);

  return (
    <>
      {isLoggedIn ? <Navbar /> : null}
      {isLoggedIn ? <Sidebar /> : null}

      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/myprofile" element={<MyProfile />} />
        <Route path="/changepassword" element={<ChangePassword />} />
      </Routes>
    </>
  );
}

export default App;
