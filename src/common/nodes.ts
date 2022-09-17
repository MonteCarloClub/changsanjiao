/**
 * 邻接表的节点
 */
export type Node = {
  x: number;
  y: number;
  neighbors: number[];
};

/**
 * 区块链网络上的节点
 */
const nodes = [
  {
    x: 31,
    y: 20,
    neighbors: [1, 2, 3],
  },
  {
    x: 82,
    y: 19,
    neighbors: [3, 5],
  },
  {
    x: 21,
    y: 56,
    neighbors: [4],
  },
  {
    x: 60,
    y: 48,
    neighbors: [0, 1, 2],
  },
  {
    x: 50,
    y: 74,
    neighbors: [2, 3, 5],
  },
  {
    x: 84,
    y: 62,
    neighbors: [4],
  },
];

/**
 * 区块链网络
 */
export function Net(width: number, height: number) {

  for (let index = 0; index < nodes.length; index++) {
    const node = nodes[index];
    node.x = Math.round((node.x / 100) * width);
    node.y = Math.round((node.y / 100) * height);
    
    // 把单向图变成双向，我邻居的邻居列表里要有我
    node.neighbors.forEach((n) => {
      if (!nodes[n].neighbors.includes(index)) {
        nodes[n].neighbors.push(index);
      }
    });
  }
  return nodes;
}
