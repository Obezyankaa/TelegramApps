import { TonConnectButton } from "@tonconnect/ui-react";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import styles from "./Auth.module.scss";

export default function Auth() {
  const { t } = useTranslation();

  const currentLanguage = i18next.language; // Получаем текущий язык

  const changeLanguage = (lang: string) => {
    i18next.changeLanguage(lang);
  };

  return (
    <div className={styles["auth"]}>
      <div className={styles["auth-title"]}>{t("authorization")}</div>
      <div className={styles["auth-language_block"]}>
        <div className={styles["auth-language_block-title"]}>
          {t("SelectLanguage")}
        </div>
        <div>
          <button
            onClick={() => changeLanguage("en")}
            className={currentLanguage === "en" ? styles["active"] : ""}
          >
            English
          </button>
          <button
            onClick={() => changeLanguage("ru")}
            className={currentLanguage === "ru" ? styles["active"] : ""}
          >
            Русский
          </button>
        </div>
      </div>
      <TonConnectButton />
    </div>
  );
}
