import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/layout";
import "./index.css";
import { ForecastPage } from "@/pages/forecast";
import { DataDash } from "@/pages/data-dash";
import { CorrelationPage } from "@/pages/correlation";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout title="Forecast Page" />}>
          <Route index element={<ForecastPage />} />
        </Route>
        <Route path="/correlation" element={<Layout title="Correlation Page" />}>
          <Route index element={<CorrelationPage />} />
        </Route>
        <Route path="/data-dash" element={<Layout title="Summary Page" />}>
          <Route index element={<DataDash />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
