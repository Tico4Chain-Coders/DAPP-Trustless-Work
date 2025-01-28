import { DistributeEscrowEarningsEscrowPayload } from "@/@types/escrow.entity";
import http from "@/core/config/axios/http";
import { kit } from "@/wallet/walletKit";
import { WalletNetwork } from "@creit.tech/stellar-wallets-kit";
import { signTransaction } from "@stellar/freighter-api";
import axios from "axios";

export const distributeEscrowEarnings = async (
  payload: DistributeEscrowEarningsEscrowPayload,
) => {
  try {
    const response = await http.post(
      "/escrow/distribute-escrow-earnings",
      payload,
    );

    const { unsignedTransaction } = response.data;
    const { address } = await kit.getAddress();
    const { signedTxXdr } = await signTransaction(unsignedTransaction, {
      address,
      networkPassphrase: WalletNetwork.TESTNET,
    });

    const tx = await http.post("/helper/send-transaction", {
      signedXdr: signedTxXdr,
    });

    const { data } = tx;
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Axios Error:", error.response?.data.message);
      throw new Error(error.response?.data?.message);
    } else {
      console.error("Unexpected Error:", error);
      throw new Error("Unexpected error occurred");
    }
  }
};
