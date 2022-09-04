import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import Notfound from "./pages/Notfound";
import EmployeesList from "./pages/EmployeesList";
import CreateEmployee from "./pages/CreateEmployee";
import VerticalNav from "./components/VerticalNav";

function App() {
  return (
    <BrowserRouter>
      <VerticalNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/employeeslist" element={<EmployeesList />} />
        <Route path="/createemployee" element={<CreateEmployee />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
