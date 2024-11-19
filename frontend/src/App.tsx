import React from "react";
import BasicInfo from "./pages/BasicInfo.tsx";
import Section2 from "./pages/Section2.tsx";
import { Route,  Routes } from "react-router-dom";
import NotFound from "./pages/PageNotFound.tsx";
import Section3 from "./pages/Section3.tsx";
import Section4 from "./pages/Section4.tsx";
import Section5 from "./pages/Section5.tsx";
import Section6 from "./pages/Section6.tsx";
import Section7 from "./pages/Section7.tsx";
import WelcomePage from "./pages/WelcomePage.tsx";
import Summary from "./pages/Summary.tsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/*" element={<NotFound />} />
        <Route path="/" element={<WelcomePage/>} />
        <Route path="/basicinfo" element={<BasicInfo />} />
        <Route path="/section2" element={<Section2 />} />
        <Route path="/section3" element={<Section3 />} />
        <Route path="/section4" element={<Section4 />} />
        <Route path="/section5" element={<Section5 />} />
        <Route path="/section6" element={<Section6 />} />
        <Route path="/section7" element={<Section7 />} />
        <Route path="/summary" element={<Summary />} />
      </Routes>
    </>
  );
}

export default App;


