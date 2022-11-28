import axios from "axios";
import { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
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
  const [dataSearch, setDataSearch] = useState([{ label: 'test', value: 'test' }]);
  const [getPathName, setPathName] = useState("");
  var navigate = useNavigate();
  if (location.search) {
    axios("http://localhost:1402/payments/confirm", {
      method: "post",
      headers: {
        token: process.env.REACT_APP_TOKEN_CONFIRM
      },
      data: {
        confirmCode: location.search.toString().replace('&', ' ').split(" ")[1].replace('&', ' ').split(" ")[0].replace('payment_intent_client_secret=', '')
      }
    })
    navigate("/")
  }

  useEffect(() => {
    // if (location.pathname !== "/")
    //   secretCode = ;
    // console.log(secretCode);
    async function WaitForData() {
      var res = await axios("http://localhost:1402/products/all", {
        method: "get",
        headers: {
          token: process.env.REACT_APP_TOKEN_CONFIRM
        }
      })
      setDataSearch(await res.data.data);
    }
    WaitForData();
  }, [])

  return (
    <ShoppingCartProvider>
      <div className="bg-[#E5E5E5] w-full h-full">
        <div className="max-w-[1260px] bg-white mx-auto">
          {
            location.pathname === '/register' || location.pathname === '/login' || location.pathname === '/forgotpassword' || location.pathname === '/Register' || location.pathname === '/Login' || location.pathname === '/Forgotpassword' || location.pathname.split("/")[1] === 'forgotpassword' ?
              null : <Header changePath={setPathName} pathName={getPathName} data={dataSearch} />
          }
          <Routes>
            <Route path="" element={<Home data={dataSearch} />} />
            <Route path="/?value" element={<Home />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/view" element={<View />} />
            <Route path="/view-detail" element={<ViewDetail />} />
            <Route path="/confirm-payemnt" element={<ViewDetail />} />
            <Route path="/products" element={<View />} >
              <Route path={"/products/*"} element={<View />} />
              <Route path={"/products/filter"} element={<View />} />
            </Route>

            <Route path="/profile/*" element=
              {
                <Authentication>
                  <Profile />
                </Authentication>
              } />
            <Route path="/verify" element={<VerifyAccount />} />
            <Route path="/blog/detail-blog/*" element={<DetailBlog />} />
            <Route path="/blog" element={<Blog />} />
            {/* </Routes > */}
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
        </div>
      </div>
    </ShoppingCartProvider>

  );
}

export default App;
