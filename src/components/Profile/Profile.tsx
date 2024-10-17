import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";
import { useEffect, useState } from "react";
import { Address } from "@ton/core";
import { TonClient } from "@ton/ton";

export default function Profile() {
  const userFriendlyAddress = useTonAddress();
  const rawAddress = useTonAddress(false);
  const [tonConnectUI] = useTonConnectUI();
  const [balance, setBalance] = useState(0);

  // Функция для получения баланса
  const getBalance = async (address: string) => {
    const endpoint = "https://testnet.toncenter.com/api/v2/jsonRPC"; // или используй mainnet
    const client = new TonClient({ endpoint });

    // Парсим адрес кошелька
    const walletAddress = Address.parse(address);

    // Получаем баланс
    const balance = await client.getBalance(walletAddress);

    console.log(balance, "👈👈 balance");

    // Преобразуем баланс в токены (по умолчанию баланс в нанотонах)
    const tonBalance = Number(balance) / 1e9; // Явное преобразование BigInt в число
    setBalance(tonBalance);
  };

  // Загружаем баланс при наличии адреса
  useEffect(() => {
    if (rawAddress) {
      getBalance(rawAddress);
    }
  }, [rawAddress]);

  const handleDisconnect = () => {
    tonConnectUI.disconnect();
  };

  return (
    <div>
      {userFriendlyAddress && (
        <div>
          <span>User-friendly address: {userFriendlyAddress}</span>
          <br />
          <span>
            Balance: {balance !== null ? `${balance} TON` : "Loading..."}
          </span>
          <br />
          <button onClick={handleDisconnect}>Disconnect</button>
        </div>
      )}
    </div>
  );
}
