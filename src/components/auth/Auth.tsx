import { useTonConnectModal } from "@tonconnect/ui-react";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import styles from "./Auth.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import lightImg from "./img/light.png";
import DarkImg from "./img/dark.svg";

import "swiper/css";
import "swiper/css/pagination";

import './style.css';

export default function Auth() {
  const { t } = useTranslation();
   const { open } = useTonConnectModal();

  const currentLanguage = i18next.language;
  const changeLanguage = (lang: string) => {
    i18next.changeLanguage(lang);
  };

  const redirectToCreateWallet = () => {
    window.open("https://tonhub.com", "_blank");
  };

  return (
    <div className={styles["auth"]}>
      <div className={styles["auth-language_block"]}>
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
      <Swiper
        pagination={{
          el: `.${styles["auth-swiper_pagination"]}`,
          clickable: true,
        }}
        autoplay={{
          delay: 7000,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay]}
        className={styles["auth-swiper"]}
      >
        <SwiperSlide className={styles["auth-swiper_slider"]}>
          <div className={styles["auth-swiper_slider-text_container"]}>
            <p className={styles["auth-swiper_slider-text_desc"]}>
              {t("sliderTextDesc")}
            </p>
            <h2 className={styles["auth-swiper_slider-title"]}>
              {t("sliderTitleSafe")}
            </h2>
            <p className={styles["auth-swiper_slider-text"]}>
              {t("sliderTextSafe")}
            </p>
          </div>
          <img src={lightImg} alt="lightImg" />
        </SwiperSlide>
        <SwiperSlide className={styles["auth-swiper_slider"]}>
          <div className={styles["auth-swiper_slider-text_container"]}>
            <p className={styles["auth-swiper_slider-text_desc"]}>
              {t("sliderTextDesc")}
            </p>
            <h2 className={styles["auth-swiper_slider-title"]}>
              {t("sliderTitleQuick")}
            </h2>
            <p className={styles["auth-swiper_slider-text"]}>
              {t("sliderTextQuick")}
            </p>
          </div>
          <img src={DarkImg} alt="DarkImg" />
        </SwiperSlide>
      </Swiper>
      <div className={styles["auth-swiper_pagination"]}></div>
      <div className={styles["auth-btn_container"]}>
        <button
          className={styles["auth-btn_container-create_btn"]}
          onClick={redirectToCreateWallet}
        >
          {t("createBtn")}
        </button>
        <button
          className={styles["auth-btn_container-open_btn"]}
          onClick={open}
        >
          {t("openBtn")}
        </button>
      </div>
    </div>
  );
}
