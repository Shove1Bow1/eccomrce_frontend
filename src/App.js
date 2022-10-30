import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header";
import Checkout from "./container/Checkout";
import ForgotPassword from "./container/ForgotPassword";
import Home from "./container/Home";
import Login from "./container/Login";
import Register from "./container/Register";
import View from "./container/View";

function App() {
  const location = useLocation()
  return (
    <>
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
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
      </Routes>

    </>
  );
}

export default App;
