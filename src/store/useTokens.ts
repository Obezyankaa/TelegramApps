import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { JettonBalance, TokenRates } from "@ton-api/client";
import { Address } from "@ton/core";
import ta from "../api/tonapi";

interface FormattedJettonBalance extends Omit<JettonBalance, "price"> {
  tonBalance: string;
  usdBalance: string;
  price?: TokenRates & {
    diff_24h?: {
      USD?: string;
    };
  };
}

interface JettonsStore {
  jettonsData: FormattedJettonBalance[] | null;
  stakingData: FormattedJettonBalance[] | null;
  isLoaded: boolean;
  getJettons: (address: string, callback?: () => void) => Promise<void>;
}

const useTokens = create<JettonsStore>()(
  devtools((set, get) => ({
    jettonsData: [],
    stakingData: [],
    isLoaded: false,
    getJettons: async (address, callback) => {
      const { isLoaded } = get();

      if (isLoaded) {
        if (callback) callback();
        return;
      }

      try {
        const formattedAddress = Address.parse(address);
        const response = await ta.accounts.getAccountJettonsBalances(
          formattedAddress,
          {
            currencies: ["usd"], // Укажите валюты, которые хотите получить
            supported_extensions: ["custom_payload"], // Укажите расширения
          }
        );
        // const response = await axios.get(
        //   `${url}/${address}/jettons?currencies=ton,usd&supported_extensions=custom_payload`,
        //   {
        //     headers: {
        //       Authorization: `Bearer ${key}`,
        //     },
        //   }
        // );
        const jettons = response;

        const formattedJettonsData = jettons?.balances.map(
          (el: JettonBalance) => {
            const balance = Number(el.balance);
            const tonToUsdRate = Number(el?.price?.prices?.USD);
            const decimals = el.jetton.decimals;

            const tonBalance = (balance / Math.pow(10, decimals)).toFixed(2);
            const usdBalance = (parseFloat(tonBalance) * tonToUsdRate).toFixed(
              2
            );

            return {
              ...el,
              tonBalance,
              usdBalance,
            };
          }
        );

        // Разделение токенов на обычные и стейкинговые
        const stakingData = formattedJettonsData.filter(
          (token: JettonBalance) =>
            token.jetton.name.toLowerCase().includes("stake")
        );

        const jettonsData = formattedJettonsData.filter(
          (token: JettonBalance) =>
            !token.jetton.name.toLowerCase().includes("stake")
        );

        set(
          { jettonsData, stakingData, isLoaded: true },
          false,
          "jettonsData/formatted"
        );
      } catch (error) {
        console.error(`Ошибка при получении Jettons: ${error}`);
      }
    },
  }))
);

export default useTokens;
