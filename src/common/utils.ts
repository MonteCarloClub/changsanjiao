type Position = {
  x: number;
  y: number;
  [key: string]: any;
};

/**
 * 计算两点间的距离
 * @param from 起点
 * @param to 终点
 * @returns 距离
 */
export function distance(from: Position, to: Position) {
    const dis = Math.sqrt(Math.pow(from.x - to.x, 2) + Math.pow(from.y - to.y, 2));
    const dirx = (to.x - from.x) / dis;
    const diry = (to.y - from.y) / dis;
    return {
        dis,
        dir: {
            x: dirx,
            y: diry
        }
    }
}
