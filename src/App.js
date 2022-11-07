import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header";
import Checkout from "./container/Checkout";
import Home from "./container/Home";
import View from "./container/View";
import ViewDetail from "./container/view-detail";
function App() {
  return (
    <div className="bg-[#E5E5E5] w-full h-full">
      <div className="max-w-[1260px] bg-white mx-auto">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/view" element={<View />} />
          <Route path="/view-detail" element={<ViewDetail />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
