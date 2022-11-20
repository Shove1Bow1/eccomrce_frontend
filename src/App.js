import { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header";
import VerifyAccount, { Authentication, Unauthentication } from "./container/Authentication";
import Blog from "./container/blog/Blog";
import DetailBlog from "./container/blog/DetailBlog";
import Checkout from "./container/Checkout";
import ForgotPassword from "./container/ForgotPassword";
import Home from "./container/Home";
import Login from "./container/Login";
import Profile from "./container/Profile";
import Register from "./container/Register";
import View from "./container/View";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
function App() {
  const [getPathName, setPathName] = useState("");
  const location = useLocation();
  return (
    <ShoppingCartProvider>
      <div className="bg-[#E5E5E5] w-full h-full">
        <div className="max-w-[1260px] bg-white mx-auto">
          {
            location.pathname === '/register' || location.pathname === '/login' || location.pathname === '/forgotpassword' || location.pathname === '/Register' || location.pathname === '/Login' || location.pathname === '/Forgotpassword' || location.pathname.split("/")[1] === 'forgotpassword' ?
              null : <Header changePath={setPathName} pathName={getPathName} />
          }
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/products" element={<View />} >
            </Route>
            <Route path={"/products/:pathname"} element={<View />} />
            <Route path="/profile" element=
              {
                <Authentication>
                  <Profile />
                </Authentication>
              } />
            <Route path="/verify" element={<VerifyAccount />} />
            <Route path="/blog/detail-blog/*" element={<DetailBlog />} />
            <Route path="/blog" element={<Blog />} />
          </Routes >
        </div >
      </div >
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
        <Route path="/forgotpassword/:recovercode/:id" element={
          <Unauthentication>
            <ForgotPassword isRecover={true} />
          </Unauthentication>
        } />
        <Route path="/forgotpassword/otp" element={
          <Unauthentication>
            <ForgotPassword isRecover={true} />
          </Unauthentication>
        } />
      </Routes>
    </ShoppingCartProvider >
  );
}

export default App;
