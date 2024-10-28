import { useTonAddress } from "@tonconnect/ui-react";
import { useEffect } from "react";
import qrScan from "./icon/qr-code-scan.svg";
import styles from "./Profile.module.scss";
import useBalance from "../../store/useWallet";

export default function Profile() {
  const userFriendlyAddress = useTonAddress();
  // const rawAddress = useTonAddress(false);
  const { wallet, getWallet } = useBalance();

  // Загружаем баланс при наличии адреса
  useEffect(() => {
    if (userFriendlyAddress) {
      getWallet(userFriendlyAddress);
    }
  }, [userFriendlyAddress, getWallet]);

  return (
    <section className={styles["profile"]}>
      <div className={styles["profile__avatar"]}>😊</div>
      {userFriendlyAddress && (
        <div className={styles["profile__balance"]}>
          <div className={styles["profile__version-wallet"]}>
            <div>{wallet !== null && wallet}</div>
            <div>activ</div>
          </div>
          {/* <div>{balance !== null ? `${balance} TON` : "Loading..."}</div> */}
          <div>стоимость тона</div>
          <div>{userFriendlyAddress}</div>
        </div>
      )}
      <div className={styles["profile__qr-code"]}>
        <img src={qrScan} alt="qr-scan-icon" />
      </div>
    </section>
  );
}
