import { useTonAddress } from "@tonconnect/ui-react";
import Auth from "./components/auth/Auth";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";

export default function App() {
  const userAddress = useTonAddress(); // Получаем адрес пользователя

  return (
    <>
      {userAddress ? (
        <>
          <Outlet />
          <NavBar />
        </>
      ) : (
        <Auth />
      )}
    </>
  );
}
