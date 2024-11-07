import { useTranslation } from "react-i18next";
import Title from "../ui/Title";
import i18next from "i18next";

import styles from "./Settings.module.scss";
import { useTonConnectUI } from "@tonconnect/ui-react";

export default function Settings() {
  const { t } = useTranslation();

  const currentLanguage = i18next.language;
  const changeLanguage = (lang: string) => {
    i18next.changeLanguage(lang);
  };

  const [tonConnectUI] = useTonConnectUI();
  const handleDisconnect = () => {
    tonConnectUI.disconnect();
  };
  return (
    <section style={{ padding: "1rem" }}>
      <Title title={t("settingTitle")} />
      <div className={styles["setting-container"]}>
        <div className={styles["setting-container__language-block"]}>
          <div className={styles["setting-container__language-title"]}>
            {t("language")}
          </div>
          <div>
            <button
              onClick={() => changeLanguage("en")}
              className={currentLanguage === "en" ? styles["active"] : ""}
            >
              🇺🇸
            </button>
            <button
              onClick={() => changeLanguage("ru")}
              className={currentLanguage === "ru" ? styles["active"] : ""}
            >
              🇷🇺
            </button>
          </div>
        </div>
        <div className={styles["block"]}>какие то ещё настройки</div>
        <div>какие то ещё настройки</div>
      </div>
      <button className={styles["exit-btn"]} onClick={handleDisconnect}>
        {t("exitWallet")}
      </button>
    </section>
  );
}
