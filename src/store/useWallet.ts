// Обновленная функция с типизацией коллбека в Zustand с использованием Redux DevTools
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Address } from "@ton/core";
import ta from "../api/tonapi";

interface BalanceType {
  balanceTon: string;
  bacanceUsd: string;
  wallet: string;
  isLoaded: boolean;
  getWallet: (address: string, callback?: () => void) => Promise<void>;
}

const useWallet = create<BalanceType>()(
  devtools((set, get) => ({
    balanceTon: "",
    bacanceUsd: "",
    wallet: "",
    isLoaded: false,
    getWallet: async (address, callback) => {
      const { isLoaded } = get();
      if (isLoaded) {
        if (callback) callback();
        return;
      }
      try {
        const formattedAddress = Address.parse(address);
        const response = await ta.accounts.getAccounts(
          {
            accountIds: [formattedAddress], // Первый параметр: data
          },
          {
            currency: "usd", // Второй параметр: query
          }
        );

        const walletVersion = response.accounts;
        const balance: number = Number(walletVersion[0].balance);
        const tonToUsdRate: number = Number(
          walletVersion[0]?.currenciesBalance?.USD
        );
        const tonBalance = (balance / 1e9).toFixed(2);
        const usdBalance = (parseFloat(tonBalance) * tonToUsdRate).toFixed(2);
        set({ balanceTon: tonBalance }, false, "wallet/tonBalance");
        set({ bacanceUsd: usdBalance }, false, "wallet/usdBalance");
        set(
          { wallet: walletVersion[0].interfaces?.join(""), isLoaded: true },
          false,
          "wallet/setWallet"
        );
      } catch (error) {
        console.error("Ошибка запроса к TonAPI:", error);
      }
    },
  }))
);

export default useWallet;
