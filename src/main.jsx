import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { FeistelNetwork } from "./FeistelNetwork.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <FeistelNetwork />
  </StrictMode>
);
