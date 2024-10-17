import { useState, useEffect } from "react";
import "./App.css";
import Auth from "./components/auth/Auth";
import { useTonAddress } from "@tonconnect/ui-react";
import HomePage from "./pages/HomePage";

export default function App() {
  const userAddress = useTonAddress(); // Получаем адрес пользователя
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Когда адрес изменяется (появляется или пропадает), обновляем состояние авторизации
  useEffect(() => {
    if (userAddress) {
      setIsAuthenticated(true); // Если адрес есть, пользователь авторизован
    } else {
      setIsAuthenticated(false); // Если нет, пользователь не авторизован
    }
  }, [userAddress]);

  return <>{isAuthenticated ? <HomePage /> : <Auth />}</>;
}
