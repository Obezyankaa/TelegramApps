import { create } from "zustand";
import axios from "axios";

const url = "https://tonapi.io/v2/accounts/";

interface BalanceType {
  balance: number;
  wallet: string;
  getWallet: (address: string) => Promise<void>;
}

const useWallet = create<BalanceType>((set) => ({
  balance: 0,
  wallet: "",
  getWallet: async (address) => {
    const key = import.meta.env.VITE_TON_API_KEY;
    try {
      const response = await axios.get(`${url}/${address}`, {
        headers: {
          Authorization: `Bearer ${key}`,
        },
      });

      if (response.status === 200) {
        const walletVersion = response.data;
        console.log(`Версия кошелька для адреса ${address}:`, walletVersion);
        // Если нужно обновить состояние:
        set({ wallet: walletVersion.interfaces.join("") });
      } else {
        console.error(
          `Ошибка при получении версии кошелька: ${response.status}`
        );
      }
    } catch (error) {
      console.error("Ошибка запроса к TonAPI:", error);
    }
  },
}));

export default useWallet;
