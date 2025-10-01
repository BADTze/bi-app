import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {ForecastPage} from "@/pages/forecast";
import {HomePage} from "@/pages/home-page";
import Layout from "@/layout";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout title="Apps Title" />}>
          <Route index element={<HomePage />} />
        </Route>
        <Route path="/forecast" element={<Layout title="Forecast Page" />}>
          <Route index element={<ForecastPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
