import { create } from "zustand";
import { devtools } from "zustand/middleware";
import ta from "../api/tonapi";
import { Address } from "@ton/core";
import { Transaction } from "@ton-api/client";

interface HistoryType {
  historyData: Transaction[] | null;
  isLoaded: boolean;
  getHistory: (address: string, callback?: () => void) => Promise<void>;
}

const useHistory = create<HistoryType>()(
  devtools((set, get) => ({
    historyData: [],
    isLoaded: false,

    getHistory: async (address: string, callback) => {
      if (!address) {
        console.error("Address не установлен");
        return;
      }

      const { isLoaded } = get();
      if (isLoaded) {
        if (callback) callback();
        return;
      }

      try {
        const formattedAddress = Address.parse(address);
        const response = await ta.blockchain.getBlockchainAccountTransactions(
          formattedAddress,
          {
            limit: 20,
          }
        );

        set({ historyData: response.transactions, isLoaded: true }, false, "historyData");
      } catch (error) {
        console.error("Ошибка запроса к TonAPI:", error);
      }
    },
  }))
);

export default useHistory;
