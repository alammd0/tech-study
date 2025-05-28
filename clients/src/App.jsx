import { Route, Routes } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Home from "./page/Home";

function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col">
      <Navbar />

      {/* <div>Hello World</div> */}
      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>

    </div>
  );
}

export default App;
