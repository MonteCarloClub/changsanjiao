/**
 * 邻接表的节点
 */
export type Node = {
  x: number;
  y: number;
  neighbors: number[];
  color: string;
};

/**
 * 区块链网络上的节点
 */
const nodes = [
  {
    x: 31,
    y: 20,
    neighbors: [2, 3],
    color: 'bisque',
  },
  {
    x: 82,
    y: 19,
    neighbors: [3, 5],
    color: 'bisque',
  },
  {
    x: 21,
    y: 56,
    neighbors: [4],
    color: 'bisque',
  },
  {
    x: 60,
    y: 48,
    neighbors: [0, 1, 2],
    color: 'black',
  },
  {
    x: 50,
    y: 84,
    neighbors: [2, 3, 5],
    color: 'black',
  },
  {
    x: 84,
    y: 62,
    neighbors: [4],
    color: 'black',
  },
  {
    x: 8,
    y: 28,
    neighbors: [0, 2],
    color: 'black',
  },
  {
    x: 13,
    y: 80,
    neighbors: [4, 2],
    color: 'black',
  },
  {
    x: 53,
    y: 10,
    neighbors: [0, 1],
    color: 'black',
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
