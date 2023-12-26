import React from "react";
import "./App.css";
import { Navigate, Route, Routes, HashRouter } from "react-router-dom";
import { MainPage } from "./pages/MainPage";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/*" element={<Navigate to="/main"></Navigate>}></Route>
        <Route path="/main" element={<MainPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
