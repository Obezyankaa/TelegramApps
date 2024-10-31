import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import "./index.css";
import { TonConnectUIProvider } from "@tonconnect/ui-react";

import "./i18n";
import Settings from "./settings/Settings";
import HomePage from "./pages/HomePage";

// const manifestUrl =
//   "https://my-gituser.github.io/telegram-apps/tonconnect-manifest.json";

  const manifestUrl =
    "https://raw.githubusercontent.com/ton-community/tutorials/main/03-client/test/public/tonconnect-manifest.json";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/", // Главная страница
        element: <HomePage />,
      },
      {
        path: "/setting",
        element: <Settings />,
      },
      // Добавьте другие страницы аналогично
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <TonConnectUIProvider manifestUrl={manifestUrl}>
    <RouterProvider router={router} />
  </TonConnectUIProvider>
);
