import { useTonAddress } from "@tonconnect/ui-react";
import styles from "./List.module.scss";
import { useEffect } from "react";
import useTokens from "../../store/useTokens";
import { useTranslation } from "react-i18next";
import useNft from "../../store/useNft";

export default function List() {
  const { t } = useTranslation();
  const userFriendlyAddress = useTonAddress();

  const { jettonsData, stakingData, getJettons } = useTokens();
  const { nftData, getNft } = useNft();

  useEffect(() => {
    if (userFriendlyAddress) {
      getJettons(userFriendlyAddress);
      getNft(userFriendlyAddress);
    }
  }, [userFriendlyAddress, getJettons, getNft]);

  // Фильтруем NFT, которые нужно отобразить
 const filteredNftData =
   nftData?.[0]?.nftItems?.filter(
     (nft) => nft.verified && nft.trust !== "blacklist" && !nft.owner?.isScam
   ) || [];

  
// console.log(filteredNftData, '👈👈 filteredNftData');
//   console.log(nftData, "👈👈 nftData");

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
                      color: el?.price?.diff_24h?.USD?.includes("−")
                        ? "red"
                        : "green",
                    }}
                  >
                    {el?.price?.diff_24h?.USD !== "0.00%"
                      ? el?.price?.diff_24h?.USD
                      : null}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles["jettons-tokens"]}>
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
                      color: el?.price?.diff24h?.USD.includes("−")
                        ? "red"
                        : "green",
                    }}
                  >
                    {el?.price?.diff24h?.USD !== "0.00%"
                      ? el?.price?.diff24h?.USD
                      : null}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <h2 className={styles["jettons-staking__title"]}>{t("nft")}</h2>
      <div className={styles["nft-list"]}>
        {filteredNftData.length > 0 ? (
          filteredNftData.map((nft, index) => (
            <div key={index} className={styles["nft-list__item"]}>
              <img
                src={nft.metadata.image}
                alt={nft.metadata.name}
                className={styles["nft-list__image"]}
              />
              <p className={styles["nft-list__name"]}>{nft.metadata.name}</p>
              {/* <p className={styles["nft-description"]}>
                {nft.metadata.description}
              </p> */}
              {/* Отображение атрибутов NFT */}
              {/* <div className={styles["nft-attributes"]}>
                {nft.metadata.attributes?.map((attr, attrIndex) => (
                  <div key={attrIndex} className={styles["nft-attribute"]}>
                    <strong>{attr.trait_type}: </strong>
                    {attr.value}
                  </div>
                ))}
              </div> */}
            </div>
          ))
        ) : (
          <p>{t("no_nfts")}</p>
        )}
      </div>
    </section>
  );
}

