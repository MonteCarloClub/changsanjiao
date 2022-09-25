import contract from "@/assets/contract.svg";
import record from "@/assets/records.svg";
import credential from "@/assets/verify.svg";
import address from "@/assets/address.svg";

/**
 * 一个角色
 */
export type Item = {
  x: number;
  y: number;
  title?: string;
  type: 'contract' | 'records' | 'credential' | 'address';
};

export const itemIcons = {
    contract,
    record,
    credential,
    address
}