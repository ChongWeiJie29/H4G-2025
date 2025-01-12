import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserDashboard from "./pages/UserDashboard";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<UserDashboard />} />
    </Routes>
  </Router>
);

export default App;
