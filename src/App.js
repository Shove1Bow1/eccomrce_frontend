import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Component/Silder/header/Header";
import Home from "./container/Home";

function App() {
  return (
    <BrowserRouter>
      <div className="bg-black">
        <div className="max-w-[1260px] bg-white mx-auto">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
