import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AlgorithmDemo from "./components/AlgorithmDemo";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="flex flex-col min-h-screen">
              {/* <Header /> */}
              <main className="flex-grow">
                <Home />
              </main>
              <Footer />
            </div>
          }
        />
        <Route path="/demo/:algoKey" element={<AlgorithmDemo />} />
      </Routes>
    </Router>
  );
}

export default App;
