import axios from "axios";
import { useLayoutEffect, useState } from "react";
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
import ViewDetail from "./container/view-detail";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.

function App() {
  const location = useLocation()
  const [dataSearch, setDataSearch] = useState([{ label: 'cc', value: 'dds' }]);

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
            location.pathname !== '/register' && location.pathname !== '/login' && location.pathname !== '/forgotpassword' && location.pathname !== '/Register' && location.pathname !== '/Login' && location.pathname !== '/Forgotpassword' ?
              <Header data={dataSearch} /> : null
          }
          <Routes>
            <Route path="/" element={<Home data={dataSearch} />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/view" element={<View />} />
            <Route path="/view-detail" element={<ViewDetail />} />
            <Route path="/confirm-payemnt" element={<ViewDetail />} />
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
