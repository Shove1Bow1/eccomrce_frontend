import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header";
import Authentication from "./container/Authentication";
import Checkout from "./container/Checkout";
import ForgotPassword from "./container/ForgotPassword";
import Home from "./container/Home";
import Login from "./container/Login";
import Register from "./container/Register";
import View from "./container/View";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
function App() {
  const location = useLocation()
  return (
    <ShoppingCartProvider>
      <div className="bg-[#E5E5E5] w-full h-full">
        <div className="max-w-[1260px] bg-white mx-auto">
          {
            location.pathname !== '/register' && location.pathname !== '/login' && location.pathname !== '/forgotpassword' && location.pathname !== '/Register' && location.pathname !== '/Login' && location.pathname !== location.pathname !== '/Forgotpassword' ?
              <Header /> : null
          }
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/view" element={<View />} />
          </Routes>
        </div>
      </div>

      <Routes>
        <Route path="/register" element={
          <Authentication>
            <Register />
          </Authentication>
        } />

        <Route path="/login" element={
          <Authentication>
            <Login />
          </Authentication>
        } />
        <Route path="/forgotpassword" element={
          <Authentication>
            <ForgotPassword />
          </Authentication>
        } />
      </Routes>
    </ShoppingCartProvider>
  );
}

export default App;
