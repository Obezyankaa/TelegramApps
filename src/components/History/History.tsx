import { useTonAddress } from "@tonconnect/ui-react";
import styles from "./History.module.scss";
import { useEffect } from "react";
import useHistory from "../../store/useHistory";
import { Transaction } from "@ton-api/client";
import { useTranslation } from "react-i18next";
import Title from "../../ui/Title";

export default function History() {
  const { t } = useTranslation();
  const userFriendlyAddress = useTonAddress();
  const { historyData, getHistory } = useHistory();

  useEffect(() => {
    if (userFriendlyAddress) {
      getHistory(userFriendlyAddress);
    }
  }, [userFriendlyAddress, getHistory]);

  // Функция для форматирования даты
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000); // Перевод из секунд в миллисекунды
    return date.toLocaleDateString("en-En", {
      month: "long",
      day: "numeric",
    });
  };

  // Определим тип для группированных транзакций
  type GroupedTransactions = { [date: string]: Transaction[] };

  // Функция для группировки транзакций по дате
  const groupByDate = (transactions: Transaction[]): GroupedTransactions => {
    return transactions.reduce<GroupedTransactions>((groups, transaction) => {
      const date = formatDate(transaction.utime);
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(transaction);
      return groups;
    }, {});
  };

  const groupedTransactions = groupByDate(historyData || []);

  return (
    <section className={styles["history"]}>
      <Title title={t("historyTitle")}/>
      <div className={styles["transaction"]}>
        {Object.entries(groupedTransactions).map(([date, transactions]) => (
          <div key={date} className={styles["transaction-group"]}>
            <div className={styles["transaction-date"]}>{date}</div>
            {transactions.map((transaction, index) => (
              <div key={index} className={styles["transaction-item"]}>
                <div>
                  <img src="$" alt="$" />
                  <div>
                    <div>{/* Transaction title or description */}</div>
                    <div>{/* Transaction amount or details */}</div>
                  </div>
                </div>
                <div>
                  <div>{/* Additional transaction info */}</div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
