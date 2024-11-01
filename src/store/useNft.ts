import { create } from "zustand";
import { devtools } from "zustand/middleware";
import ta from "../api/tonapi";
import { Address } from "@ton/core";
import { NftItems } from "@ton-api/client";

interface NftType {
  nftData: NftItems[] | null;
  isLoaded: boolean;
  getNft: (address: string, callback?: () => void) => Promise<void>;
}

const useNft = create<NftType>()(
  devtools((set, get) => ({
    nftData: [],
    isLoaded: false,
    getNft: async (address: string, callback) => {
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
        const response = await ta.accounts.getAccountNftItems(
          formattedAddress,
          {
            limit: 100,
            offset: 0,
            indirect_ownership: true,
          }
        );
        set({ nftData: [response], isLoaded: true }, false, "nftItems");
      } catch (error) {
        console.error("Ошибка запроса к TonAPI:", error);
      }
    },
  }))
);

export default useNft;
