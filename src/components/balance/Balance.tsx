import useBalance from "../../store/useWallet";
import iconTon from "./icon/toncoin-ton-logo.svg";

import styles from "./Balance.module.scss";
import { useTranslation } from "react-i18next";

export default function Balance() {
  const { balanceTon, bacanceUsd } = useBalance();
  const { t } = useTranslation();
  return (
    <section className={styles["balance-section"]}>
      <div className={styles["balance-section__title"]}>{t("balance")}</div>
      <div className={styles["balance-section__currency"]}>
        <div className={styles["balance-section__tonBalance"]}>
          <img src={iconTon} alt="iconTon" />
          <span>{balanceTon} TON</span>
        </div>
        <div className={styles["balance-section__usdBalance"]}>
          ≈ ${bacanceUsd}
        </div>
      </div>
    </section>
  );
}
