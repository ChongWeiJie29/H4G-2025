import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserDashboard from "./pages/UserDashboard";
import UserMinimart from  "./pages/UserMinimart";
import UserShoppingCart from  "./pages/UserShoppingCart";
import Login from "./pages/Login";
import UserProfile from "./pages/UserProfile";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<UserDashboard />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/shop" element={<UserMinimart />} />
      <Route path="/cart" element={<UserShoppingCart />} />
    </Routes>
  </Router>
);

export default App;
