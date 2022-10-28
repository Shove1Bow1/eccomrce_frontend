import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header";
import Register from "./components/Register";
import Home from "./container/Home";
function App() {
  return (
    <div className="bg-[#E5E5E5] w-full h-full">
      <div className="max-w-[1260px] bg-white mx-auto">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Register" element={<Register />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
