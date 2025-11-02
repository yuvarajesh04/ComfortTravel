import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";

export const AppRoutes = () => {
  return (
      <BrowserRouter>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
      </BrowserRouter>
  );
}