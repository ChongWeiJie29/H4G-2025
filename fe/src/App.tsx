import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserDashboard from "./pages/UserDashboard";
import UserMinimart from "./pages/UserMinimart";
import UserShoppingCart from "./pages/UserShoppingCart";
import Login from "./pages/Login";
import UniqueInviteLink from "./pages/UniqueInviteLink";
import ForgetPassword from "./pages/ForgetPassword";
import UserProfile from "./pages/UserProfile";
import RequestVoucher from "./pages/RequestVoucher";
import { CartProvider } from "./components/General/CartContext";
import AdminPage from "./pages/AdminPage";
import TransactionHistory from "./pages/TransactionHistory";
import ProtectedRoute from "./pages/ProtectedRoute";
import { AuthProvider } from "./components/General/AuthContext";
import { useEffect } from "react";

const setFavicon = (url: string) => {
  const link = document.querySelector("link[rel*='icon']") as HTMLLinkElement || document.createElement('link');
  link.type = 'image/x-icon';
  link.rel = 'shortcut icon';
  link.href = url;
  document.head.appendChild(link);
};

const App: React.FC = () => {
  useEffect(() => {
    document.title = "Muhammadiyah Welfare Home";
    setFavicon('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUovaIrSP9QWrJWNI_ZmR6A7BazFYG6bAP7w&s');
  }, []);

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/createPassword" element={<UniqueInviteLink />} />
            <Route path="/forgetPassword" element={<ForgetPassword />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route
              path="/transaction-history"
              element={<TransactionHistory />}
            />
            <Route path="/voucher-request" element={<RequestVoucher />} />
            <Route path="/shop" element={<UserMinimart />} />
            <Route path="/cart" element={<UserShoppingCart />} />
            {/*<Route path="/admin" element={<AdminPage />} />
             */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminPage />
                </ProtectedRoute>
              }
            />
            {/* Save this for the last step
          <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminPage />
                </ProtectedRoute>
              }
            /> */}
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
