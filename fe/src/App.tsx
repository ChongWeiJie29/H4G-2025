import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserDashboard from "./pages/UserDashboard";
import UserMinimart from "./pages/UserMinimart";
import UserShoppingCart from "./pages/UserShoppingCart";
import Login from "./pages/Login";
import UserProfile from "./pages/UserProfile";
import RequestVoucher from "./pages/RequestVoucher";
import { CartProvider } from "./components/General/CartContext";
import AdminPage from "./pages/AdminPage";
import { ApolloConsumer } from "@apollo/client";

const App = () => (
    <ApolloConsumer>
      {(client) => (
        <CartProvider>
            <Router>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<UserDashboard />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/voucher-request" element={<RequestVoucher />} />
                <Route path="/shop" element={<UserMinimart />} />
                <Route path="/cart" element={<UserShoppingCart />} />
                <Route path="/admin" element={<AdminPage client={client} />} />
              </Routes>
            </Router>
        </CartProvider>
      )}
    </ApolloConsumer>
);

export default App;
