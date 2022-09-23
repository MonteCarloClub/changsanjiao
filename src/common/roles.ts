import bank from "@/assets/bank.svg";
import user from "@/assets/user.svg";
import block from "@/assets/block.svg";
import institution from "@/assets/institution.svg";

/**
 * 一个角色
 */
export type Role = {
  x: number;
  y: number;
  role: 'user' | 'institution' | 'bank' | 'block';
  title?: string;
};

export const roleIcons = {
    bank,
    user,
    block,
    institution
}

/**
 * 示意场景
 */
export function createScene(roles: Role[],width: number, height: number) {
  for (let index = 0; index < roles.length; index++) {
    const role = roles[index];
    role.x = Math.round((role.x / 100) * width);
    role.y = Math.round((role.y / 100) * height);
  }
  return roles;
}
