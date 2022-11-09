import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header";
import Unauthentication, { Authentication } from "./container/Authentication";
import Checkout from "./container/Checkout";
import ForgotPassword from "./container/ForgotPassword";
import Home from "./container/Home";
import Login from "./container/Login";
import Profile from "./container/Profile";
import Register from "./container/Register";
import View from "./container/View";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
function App() {
  const pathName = '';
  const location = useLocation()
  return (
    <ShoppingCartProvider>
      <div className="bg-[#E5E5E5] w-full h-full">
        <div className="max-w-[1260px] bg-white mx-auto">
          {
            location.pathname !== '/register' && location.pathname !== '/login' && location.pathname !== '/forgotpassword' && location.pathname !== '/Register' && location.pathname !== '/Login' && location.pathname !== '/Forgotpassword' ?
              <Header valuePath={pathName} /> : null
          }
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/view" element={<View />} />
            <Route path={`/filter/:pathName`} element={<View />} />
            <Route path="/profile" element=
              {
                <Authentication>
                  <Profile />
                </Authentication>
              } />
          </Routes>
        </div>
      </div>

      <Routes>
        <Route path="/register" element={
          <Unauthentication>
            <Register />
          </Unauthentication>
        } />

        <Route path="/login" element={
          <Unauthentication>
            <Login />
          </Unauthentication>
        } />
        <Route path="/forgotpassword" element={
          <Unauthentication>
            <ForgotPassword />
          </Unauthentication>
        } />
      </Routes>
    </ShoppingCartProvider>
  );
}

export default App;
