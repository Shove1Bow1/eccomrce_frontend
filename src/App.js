import axios from "axios";
import { useLayoutEffect, useState } from "react";
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
import ViewDetail from "./container/view-detail";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.

function App() {
  const location = useLocation()
  const [dataSearch, setDataSearch] = useState([{ label: 'cc', value: 'dds' }]);
  const [getPathName, setPathName] = useState("");
  useLayoutEffect(() => {
    axios
      .get("http://localhost:1402/products")
      .then((e) => {
        setDataSearch(e.data.data)
      })
      .then(function (error) {
        if (error)
          console.log(error);
      });
  }, [])

  return (
    <ShoppingCartProvider>
      <div className="bg-[#E5E5E5] w-full h-full">
        <div className="max-w-[1260px] bg-white mx-auto">
          {
            location.pathname === '/register' || location.pathname === '/login' || location.pathname === '/forgotpassword' || location.pathname === '/Register' || location.pathname === '/Login' || location.pathname === '/Forgotpassword' || location.pathname.split("/")[1] === 'forgotpassword' ?
              null : <Header changePath={setPathName} pathName={getPathName} />
          }
          <Routes>
            <Route path="/" element={<Home data={dataSearch} />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/view" element={<View />} />
            <Route path="/view-detail" element={<ViewDetail />} />
            <Route path="/confirm-payemnt" element={<ViewDetail />} />
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
            {/* </Routes > */}
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
    </ShoppingCartProvider>

  );
}

export default App;
