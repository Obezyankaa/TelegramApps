import { useTonAddress } from "@tonconnect/ui-react";
import HomePage from "./pages/HomePage";
import Auth from "./components/auth/Auth";
import "./App.css";

export default function App() {
  const userAddress = useTonAddress(); // Получаем адрес пользователя
  
  return <>{userAddress ? <HomePage /> : <Auth />}</>;
}
