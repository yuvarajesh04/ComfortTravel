import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/admin/Home";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import { Profile } from "./pages/admin/Profile";
import Trips from "./pages/admin/Trips";
import { AssignTrip } from "./pages/admin/Assigntrip";
import { ManageTrip } from "./pages/admin/ManageTrip";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="admin/home" element={<Home />} />
        <Route path="admin/profile" element={ <Profile /> } />
        <Route path="admin/trips" element={ <Trips /> } />
        <Route path="admin/assign-trip" element={ <AssignTrip /> } />
        <Route path="admin/manage-trip/:id" element={ <ManageTrip /> } />
      </Routes>
    </BrowserRouter>
  );
}