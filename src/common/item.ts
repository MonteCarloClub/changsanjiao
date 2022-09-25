import contract from "@/assets/contract.svg";
import record from "@/assets/records.svg";

/**
 * 一个角色
 */
export type Item = {
  x: number;
  y: number;
  title?: string;
  type: 'contract' | 'records';
};

export const itemIcons = {
    contract,
    record,
}