import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserDashboard from "./pages/UserDashboard";
import UserMinimart from  "./pages/UserMinimart";
import UserShoppingCart from  "./pages/UserShoppingCart";
import Login from "./pages/Login";

const App = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<UserDashboard />} />
      <Route path="/shop" element={<UserMinimart />} />
      <Route path="/cart" element={<UserShoppingCart />} />
    </Routes>
  </Router>
);

export default App;
