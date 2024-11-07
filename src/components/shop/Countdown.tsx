import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

// Тип для времени обратного отсчета
interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// Определяем стили с типом React.CSSProperties
const styles: { [key: string]: React.CSSProperties } = {
  countdown: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "60vh",
    textAlign: "center",
  },
  timer: {
    fontSize: "2em",
    marginTop: "20px",
  },
  mainContent: {
    textAlign: "center",
    padding: "20px",
  },
};

const Countdown = () => {
  const { t } = useTranslation();
  const targetDate = new Date("2024-12-31T23:59:59").getTime();
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isCountdownOver, setIsCountdownOver] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        setIsCountdownOver(true);
        clearInterval(intervalId);
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    const intervalId = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(intervalId);
  }, [targetDate]);

  return (
    <div>
      {isCountdownOver ? (
        <div style={styles.mainContent}>
          <h1>Добро пожаловать на сайт!</h1>
          <p>Здесь будет основной контент сайта.</p>
        </div>
      ) : (
        <div style={styles.countdown}>
          <h1>{t("soon")} !</h1>
          <div style={styles.timer}>
            <span>{timeLeft.days}д</span> <span>{timeLeft.hours}ч</span>{" "}
            <span>{timeLeft.minutes}м</span> <span>{timeLeft.seconds}с</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Countdown;
