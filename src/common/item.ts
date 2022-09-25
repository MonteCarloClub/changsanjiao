import contract from "@/assets/contract.svg";
import record from "@/assets/records.svg";
import credential from "@/assets/verify.svg";
import offChain from "@/assets/off-chain.svg";
import transfer from "@/assets/transfer.svg";
import transferred from "@/assets/transferred.svg";
import address from "@/assets/address.svg";

/**
 * 一个角色
 */
export type Item = {
  x: number;
  y: number;
  title?: string;
  type: 'contract' | 'records' | 'credential' | 'offChain' | 'transfer' | 'address' | 'transferred';
};

export const itemIcons = {
    contract,
    record,
    credential,
    offChain,
    transfer,
    transferred,
    address
}