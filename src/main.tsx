import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Board from "./board/board.tsx";
import { CardDeckConfig } from "./card-deck/card-deck-config";
import { Analytics } from "@vercel/analytics/react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Analytics />
      <div className="container">
        <Routes>
          <Route path="/" element={<Board />} />
          <Route path="/config" element={<CardDeckConfig />} />
        </Routes>
      </div>
    </BrowserRouter>
  </StrictMode>,
);
