import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import UserPage from "./pages/UserPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/:id" element={<UserPage />} />
      </Routes>
    </div>
  );
}

export default App;
