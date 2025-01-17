// Обновленная функция с типизацией коллбека в Zustand с использованием Redux DevTools
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import axios from "axios";

const url = "https://tonapi.io/v2/accounts/";

interface BalanceType {
  balance: number;
  wallet: string;
  address: string;
  accounts_bulk: string[];
  getWallet: (address: string, callback?: () => void) => Promise<void>;
  getAccounts: () => Promise<void>;
}
const key = import.meta.env.VITE_TON_API_KEY;

const useWallet = create<BalanceType>()(
  devtools((set, get) => ({
    balance: 0,
    wallet: "",
    address: "",
    accounts_bulk: [],
    getWallet: async (address, callback) => {
      try {
        const response = await axios.get(`${url}/${address}`, {
          headers: {
            Authorization: `Bearer ${key}`,
          },
        });

        if (response.status === 200) {
          const walletVersion = response.data;
          set({ address: walletVersion.address }, false, "wallet/setAddress");
          set(
            { wallet: walletVersion.interfaces.join("") },
            false,
            "wallet/setWallet"
          );

          // Вызываем коллбек, если он передан
          if (callback) {
            callback();
          }
        } else {
          console.error(
            `Ошибка при получении версии кошелька: ${response.status}`
          );
        }
      } catch (error) {
        console.error("Ошибка запроса к TonAPI:", error);
      }
    },
    getAccounts: async () => {
      const { address } = get();
      if (!address) {
        console.error("Address не установлен");
        return;
      }
      try {
        const response = await axios.post(
          `${url}_bulk?currency=usd`, // Адрес для POST запроса
          {
            account_ids: [address], // Тело запроса с адресом
          },
          {
            headers: {
              Authorization: `Bearer ${key}`,
            },
          }
        );
        if (response.status === 200) {
          const data = response.data;
          set({ accounts_bulk: data.accounts }, false, "wallet/setAccountsBulk");
        }
      } catch (error) {
        console.log("Ошибка в функции getAccounts:", error);
      }
    },
  }))
);

export default useWallet;
