import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Pages/Layout";
import Home from "./Pages/Home";
import Games from "./Pages/Games";
import GetKey from "./Pages/GetKey";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<Games />} />
          <Route path="/getkey" element={<GetKey />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
