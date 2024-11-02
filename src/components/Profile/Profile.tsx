import { useEffect, useState } from "react";
import { useIsConnectionRestored, useTonAddress } from "@tonconnect/ui-react";
import qrScan from "./icon/qr-code-scan.svg";
import styles from "./Profile.module.scss";
import useBalance from "../../store/useWallet";
import { useTranslation } from "react-i18next";

export default function Profile() {
  const { t } = useTranslation();
  const userFriendlyAddress = useTonAddress();
  const isConnectionRestored = useIsConnectionRestored();
  const { wallet, getWallet } = useBalance();

  const [showCopyNotification, setShowCopyNotification] = useState(false);
  const [openModalInfoWallet, setOpenModalInfoWallet] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // Функция для сокращения адреса
  const shortenAddress = (address: string) => {
    return address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "";
  };

  const copyToClipboard = (address: string) => {
    if (address) {
      navigator.clipboard.writeText(address);
      setShowCopyNotification(true);

      setTimeout(() => {
        setShowCopyNotification(false);
      }, 3000);
    }
  };
  //функция для открытие модалки
  const clickOpenModalHandler = () => {
    setOpenModalInfoWallet(!openModalInfoWallet);
  };
  //функция для закрытия модалки
  const closeModalHandler = () => {
    setIsClosing(true);
    setTimeout(() => {
      setOpenModalInfoWallet(false);
      setIsClosing(false);
    }, 500);
  };

  // Загружаем баланс при наличии адреса
  useEffect(() => {
    if (userFriendlyAddress) {
      getWallet(userFriendlyAddress);
    }
  }, [userFriendlyAddress, getWallet]);

  return (
    <>
      <section className={styles["profile"]}>
        {userFriendlyAddress && (
          <div
            onClick={() => clickOpenModalHandler()}
            className={styles["profile__balance"]}
          >
            <div className={styles["profile__avatar"]}>
              😊
              <div
                className={
                  styles[
                    `profile__${isConnectionRestored ? "active" : "offline"}`
                  ]
                }
              ></div>
            </div>
            <div className={styles["profile__address"]}>
              {shortenAddress(userFriendlyAddress)}
            </div>
            <div
              onClick={() => clickOpenModalHandler()}
              className={styles["profile__modal"]}
            >
              <svg
                width="19px"
                height="19px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 10L12 15L17 10"
                  stroke="var(--text)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        )}
        <div className={styles["profile__qr-code"]}>
          <img src={qrScan} alt="qr-scan-icon" />
        </div>
        {showCopyNotification && (
          <div className={styles["copy-notification"]}>
            <svg
              width="25px"
              height="25px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.0303 10.0303C16.3232 9.73744 16.3232 9.26256 16.0303 8.96967C15.7374 8.67678 15.2626 8.67678 14.9697 8.96967L10.5 13.4393L9.03033 11.9697C8.73744 11.6768 8.26256 11.6768 7.96967 11.9697C7.67678 12.2626 7.67678 12.7374 7.96967 13.0303L9.96967 15.0303C10.2626 15.3232 10.7374 15.3232 11.0303 15.0303L16.0303 10.0303Z"
                fill="var(--text)"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12Z"
                fill="var(--text)"
              />
            </svg>
            <p>{t("copyWallet")}</p>
          </div>
        )}
      </section>
      {openModalInfoWallet && (
        <div className={styles["modal-info-wallet"]}>
          <div className={styles["overlay"]} onClick={closeModalHandler}></div>
          <div
            className={`${styles["all-info-wallet"]} ${
              isClosing ? styles["slide-down"] : ""
            }`}
          >
            <div className={styles["modal-info-wallet__container"]}>
              <div className={styles["modal-info-wallet__version-wallet"]}>
                <svg
                  width="50px"
                  height="50px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.5008 14.1502H16.5098M19 4.00098H6.2C5.0799 4.00098 4.51984 4.00098 4.09202 4.21896C3.71569 4.41071 3.40973 4.71667 3.21799 5.093C3 5.52082 3 6.08087 3 7.20098V16.801C3 17.9211 3 18.4811 3.21799 18.909C3.40973 19.2853 3.71569 19.5912 4.09202 19.783C4.51984 20.001 5.07989 20.001 6.2 20.001H17.8C18.9201 20.001 19.4802 20.001 19.908 19.783C20.2843 19.5912 20.5903 19.2853 20.782 18.909C21 18.4811 21 17.9211 21 16.801V11.201C21 10.0809 21 9.52082 20.782 9.093C20.5903 8.71667 20.2843 8.41071 19.908 8.21896C19.4802 8.00098 18.9201 8.00098 17.8 8.00098H7M16.9508 14.1502C16.9508 14.3987 16.7493 14.6002 16.5008 14.6002C16.2523 14.6002 16.0508 14.3987 16.0508 14.1502C16.0508 13.9017 16.2523 13.7002 16.5008 13.7002C16.7493 13.7002 16.9508 13.9017 16.9508 14.1502Z"
                    stroke="var(--text)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div>
                  <div
                    className={
                      styles["modal-info-wallet__version-wallet__title"]
                    }
                  >
                    {t("versionWallet")}
                  </div>
                  <div
                    className={
                      styles["modal-info-wallet__version-wallet__text"]
                    }
                  >
                    {wallet}
                  </div>
                </div>
              </div>
              <div className={styles["modal-info-wallet__address-wallet"]}>
                <svg
                  width="50px"
                  height="50px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.001 9H12.011M15.001 19L17.001 21L21.001 17M9.17188 15C9.58371 13.8348 10.695 13 12.0012 13C13.3074 13 14.4186 13.8348 14.8305 15M20 13V7.2C20 6.0799 20 5.51984 19.782 5.09202C19.5903 4.71569 19.2843 4.40973 18.908 4.21799C18.4802 4 17.9201 4 16.8 4H7.2C6.0799 4 5.51984 4 5.09202 4.21799C4.71569 4.40973 4.40973 4.71569 4.21799 5.09202C4 5.51984 4 6.07989 4 7.2V16.8C4 17.9201 4 18.4802 4.21799 18.908C4.40973 19.2843 4.71569 19.5903 5.09202 19.782C5.51984 20 6.07989 20 7.2 20H11.001M13.001 9C13.001 9.55228 12.5533 10 12.001 10C11.4487 10 11.001 9.55228 11.001 9C11.001 8.44772 11.4487 8 12.001 8C12.5533 8 13.001 8.44772 13.001 9Z"
                    stroke="var(--text)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div>
                  <div
                    className={
                      styles["modal-info-wallet__address-wallet__title"]
                    }
                  >
                    {t("publicAddress")}
                  </div>
                  <div
                    onClick={() => copyToClipboard(userFriendlyAddress)}
                    title="Нажмите, чтобы скопировать полный адрес"
                    style={{ cursor: "pointer" }}
                    className={
                      styles["modal-info-wallet__address-wallet__text"]
                    }
                  >
                    {userFriendlyAddress}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
