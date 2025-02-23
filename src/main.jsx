import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./App.jsx";
import { enableReactTracking } from "@legendapp/state/config/enableReactTracking";
import { enableReactComponents } from "@legendapp/state/config/enableReactComponents";
enableReactComponents();

enableReactTracking({
  auto: true,
});

createRoot(document.getElementById("root")).render(<App />);
