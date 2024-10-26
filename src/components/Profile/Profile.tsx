import { useIsConnectionRestored, useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";
import { useEffect, useState } from "react";
import { Address } from "@ton/core";
import { TonClient } from "@ton/ton";
import qrScan from './icon/qr-code-scan.svg';
import styles from './Profile.module.scss';

const endpoint = "https://testnet.toncenter.com/api/v2/jsonRPC";

export default function Profile() {
  const userFriendlyAddress = useTonAddress();
  const connectionRestored = useIsConnectionRestored();
  const rawAddress = useTonAddress(false);
  const [tonConnectUI] = useTonConnectUI();
  const [balance, setBalance] = useState(0);

  // Функция для получения баланса
  const getBalance = async (address: string) => {
    const client = new TonClient({ endpoint });
    const walletAddress = Address.parse(address);
    console.log(walletAddress, '👈👈 walletAddress');
    const balance = await client.getBalance(walletAddress);
    // Преобразуем баланс в токены (по умолчанию баланс в нанотонах)
    const tonBalance = Number(balance) / 1e9;
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
    <section className={styles["profile"]}>
      <div className={styles["profile__avatar"]}>
        {/* <img
          className={style["profile__avatar-image"]}
          src="/path/to/avatar.jpg"
          alt="User Avatar"
        /> */}
        😊
      </div>
      <div className={styles["profile__balance"]}>
        <div className={styles["profile__version-wallet"]}>
          <div>кошелёк</div>
          <div>activ</div>
        </div>
      </div>
      <div className={styles["profile__qr-code"]}>
        <img src={qrScan} alt="qr-scan-icon" />
      </div>
      {/* {userFriendlyAddress && (
        <div>
          <span>User-friendly address: {userFriendlyAddress}</span>
          <br />
          <span>
            Balance: {balance !== null ? `${balance} TON` : "Loading..."}
          </span>
          <br />
          <button onClick={handleDisconnect}>Disconnect</button>
        </div>
      )} */}
    </section>
  );
}
