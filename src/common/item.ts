import contract from "@/assets/contract.svg";
import record from "@/assets/records.svg";
import verified from "@/assets/verified.svg";
import credential from "@/assets/credential.svg";
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
  type: 'contract' | 'records' | 'verified' | 'offChain' | 'transfer' | 'address' | 'transferred' | 'credential';
};

export const itemIcons = {
    contract,
    record,
    verified,
    offChain,
    transfer,
    transferred,
    credential,
    address
}