import { useTonAddress } from "@tonconnect/ui-react";
import styles from "./List.module.scss";
import { useEffect } from "react";
import useTokens from "../../store/useTokens";
import { useTranslation } from "react-i18next";

export default function List() {
  const { t } = useTranslation();
  const userFriendlyAddress = useTonAddress();

  const { jettonsData, stakingData, getJettons } = useTokens();

  useEffect(() => {
    if (userFriendlyAddress) {
      getJettons(userFriendlyAddress);
    }
  }, [userFriendlyAddress, getJettons]);

  return (
    <section className={styles["jettons-section"]}>
      <div className={styles["jettons-tokens"]}>
        <h2 className={styles["jettons-tokens__title"]}>{t("tokens")}</h2>
        <div className={styles["jettons-tokens__item"]}>
          {jettonsData?.map((el, index) => (
            <div key={index} className={styles["jettons-tokens__item-block"]}>
              <div className={styles["jettons-tokens__item-info"]}>
                <img
                  className={styles["jettons-tokens__item-img"]}
                  src={el.jetton.image}
                  alt={el.jetton.name}
                />
                <div className={styles["jettons-tokens__item-titleBlock"]}>
                  <div className={styles["jettons-tokens__item-title"]}>
                    {el.jetton.name}
                  </div>
                  <div className={styles["jettons-tokens__item-sub"]}>
                    {el.jetton.symbol}
                  </div>
                </div>
              </div>
              <div className={styles["jettons-tokens__item-balance"]}>
                <div className={styles["jettons-tokens__item-balance-ton"]}>
                  {el.tonBalance} TON
                </div>
                <div
                  className={styles["jettons-tokens__item-balance-usdBlock"]}
                >
                  <span className={styles["jettons-tokens__item-balance-usd"]}>
                    ${el.usdBalance}
                  </span>
                  <span
                    style={{
                      fontSize: "12px",
                      color: el.price.diff_24h.USD.includes("−")
                        ? "red"
                        : "green",
                    }}
                  >
                    {el?.price?.diff_24h.USD !== "0.00%"
                      ? el.price.diff_24h.USD
                      : null}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 className={styles["jettons-staking__title"]}>{t("staking")}</h2>
        <div className={styles["jettons-tokens__item"]}>
          {stakingData?.map((el, index) => (
            <div key={index} className={styles["jettons-tokens__item-block"]}>
              <div className={styles["jettons-tokens__item-info"]}>
                <img
                  className={styles["jettons-tokens__item-img"]}
                  src={el.jetton.image}
                  alt={el.jetton.name}
                />
                <div className={styles["jettons-tokens__item-titleBlock"]}>
                  <div className={styles["jettons-tokens__item-title"]}>
                    {el.jetton.name}
                  </div>
                  <div className={styles["jettons-tokens__item-sub"]}>
                    {el.jetton.symbol}
                  </div>
                </div>
              </div>
              <div className={styles["jettons-tokens__item-balance"]}>
                <div className={styles["jettons-tokens__item-balance-ton"]}>
                  {el.tonBalance} TON
                </div>
                <div
                  className={styles["jettons-tokens__item-balance-usdBlock"]}
                >
                  <span className={styles["jettons-tokens__item-balance-usd"]}>
                    ${el.usdBalance}
                  </span>
                  <span
                    style={{
                      fontSize: "12px",
                      color: el.price.diff_24h.USD.includes("−")
                        ? "red"
                        : "green",
                    }}
                  >
                    {el?.price?.diff_24h.USD !== "0.00%"
                      ? el.price.diff_24h.USD
                      : null}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

