import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import "./index.css";
import { TonConnectUIProvider } from "@tonconnect/ui-react";

import "./i18n";

// this manifest is used temporarily for development purposes
const manifestUrl =
  "https://my-gituser.github.io/telegram-apps/tonconnect-manifest.json";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <TonConnectUIProvider manifestUrl={manifestUrl}>
    <RouterProvider router={router} />
  </TonConnectUIProvider>
);
