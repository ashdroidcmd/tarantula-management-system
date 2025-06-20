import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home"
import AddTarantula from './pages/AddTarantula';

function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/add-tarantula" element={<AddTarantula />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
