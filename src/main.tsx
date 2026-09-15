import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/fraunces/600.css";
import "@fontsource/fraunces/700.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "./styles/clipgaram-tokens.css";
import "./styles/signup.css";
import { SignupPage } from "./pages/SignupPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SignupPage />
  </StrictMode>,
);
