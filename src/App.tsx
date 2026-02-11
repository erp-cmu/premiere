import Home from "@pages/Home";
import Layout from "@pages/Layout";
import Login from "@pages/Login";
import Stock from "@pages/Stock";
import Unauthorized from "@pages/Unauthorized";
import { Route, Routes } from "react-router";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="stock" element={<Stock />} />
        <Route path="unauthorized" element={<Unauthorized />} />
      </Route>
    </Routes>
  );
}

export default App;
