import { Node } from "@/common/nodes";
import { distance } from "@/common/utils";

/**
 * 霓虹效果
 * @param {HTMLCanvasElement} canvas
 * @param {*} config
 * @returns
 */
export function neonPath(
  canvas: HTMLCanvasElement,
  nodes: Node[],
  config: {
    speed: number;
    neonSize: number;
  }
) {
  const w = canvas.width;
  const h = canvas.height;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return null;
  }

  var opts = {
    count: nodes.length * 2,
    spawnChance: 0.3,
    sparkChance: 0.1,
    sparkDist: 10,
    sparkSize: 2,
    speed: config.speed,
    neonSize: config.neonSize,

    // 重绘时，上一次图像的透明度
    repaintAlpha: 0.9,
    // 主亮点阴影
    shadowToTimePropMult: 6,

    // color: 'hsl(hue, 100%, 0%)',
    // 色彩变化率
    // hueChange: .1
    color: "hsl(6, 100%, 0%)",
  };

  function randomPath() {
    const fromIndex = Math.round(Math.random() * (nodes.length - 1));
    const fromNode = nodes[fromIndex];

    const neighbors = fromNode.neighbors;
    const toIndex = Math.round(Math.random() * (neighbors.length - 1));
    const toNode = nodes[neighbors[toIndex]];
    
    const { dis, dir } = distance(fromNode, toNode);
    
    return {
      from: fromNode,
      dis,
      dir,
    };
  }

  interface Line {
    x: number;
    y: number;
    reset: () => void;
    step: () => void;
  }

  let lines: Line[] = [];

  interface LineConstructor {
    new (): Line;
    (): void;
  }

  const Line = function (this: Line) {
    this.reset();
  } as LineConstructor;

  Line.prototype.reset = function () {
    const { from, dis, dir } = randomPath();
    this.distance = dis;

    this.x = from.x;
    this.y = from.y;
    // 速度
    this.vx = opts.speed * dir.x;
    this.vy = opts.speed * dir.y;
    // 进度为 0
    this.process = 0;

    // this.color = opts.color.replace('hue', tick * opts.hueChange);
  };

  Line.prototype.step = function () {
    // 行程
    const rate = this.process / this.distance;
    if (rate > 0.99) this.reset();

    // 这一步走的距离
    const sx = this.vx * (2 - rate);
    const sy = this.vy * (2 - rate);
    this.process += Math.sqrt(sx * sx + sy * sy);

    // 更新当前位置
    this.x += sx;
    this.y += sy;

    // 大亮点
    ctx.shadowBlur = rate * opts.shadowToTimePropMult;
    ctx.fillStyle = ctx.shadowColor = this.color;
    ctx.fillRect(this.x, this.y, opts.neonSize, opts.neonSize);

    // 周围的小火花点
    if (Math.random() < opts.sparkChance) {
      const xx =
        this.x +
        Math.random() * opts.sparkDist * (Math.random() < 0.5 ? 1 : -1) -
        opts.sparkSize / 2;
      const yy =
        this.y +
        Math.random() * opts.sparkDist * (Math.random() < 0.5 ? 1 : -1) -
        opts.sparkSize / 2;
      ctx.fillRect(xx, yy, opts.sparkSize, opts.sparkSize);
    }
  };

  function loop() {
    if (!ctx) {
      return;
    }
    requestAnimationFrame(loop);
    // ++tick;

    // 下面这段代码值 $ 10M
    var data = ctx.getImageData(0, 0, w, h).data;
    var newImgData = ctx.createImageData(w, h);
    for (var i = 0; i < newImgData.data.length; i += 4) {
      newImgData.data[i + 0] = data[i + 0];
      newImgData.data[i + 1] = data[i + 1];
      newImgData.data[i + 2] = data[i + 2];
      let alpha = data[i + 3] * opts.repaintAlpha;
      // 设置一个 20 阈值，不会留痕迹
      newImgData.data[i + 3] = alpha > 20 ? alpha : 0;
    }
    ctx.putImageData(newImgData, 0, 0);

    if (lines.length < opts.count && Math.random() < opts.spawnChance)
      lines.push(new Line());

    lines.map(function (line) {
      line.step();
    });
  }

  return {
    init: function () {
      requestAnimationFrame(loop);
    },
  };
}
