import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserDashboard from "./pages/UserDashboard";
import UserMinimart from  "./pages/UserMinimart";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<UserDashboard />} />
      <Route path="/shop" element={<UserMinimart />} />
    </Routes>
  </Router>
);

export default App;
