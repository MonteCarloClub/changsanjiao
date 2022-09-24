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

/**
 * 
 * @param ctx 
 * @param from 
 * @param to 
 */
export function drawArrow(ctx: CanvasRenderingContext2D, from: Position, to: Position) {
    //variables to be used when creating the arrow
    const headlen = 10;
    const arrowWidth = 3;
    const color = 'black'
    const angle = Math.atan2(to.y - from.y, to.x - from.x);

    const r = 36;
    const fromx = from.x + r
    const fromy = from.y
    const tox = to.x - r
    const toy = to.y

    ctx.save();
    ctx.strokeStyle = color;

    //starting path of the arrow from the start square to the end square
    //and drawing the stroke
    ctx.beginPath();
    ctx.moveTo(fromx, fromy);
    ctx.lineTo(tox, toy);
    ctx.lineWidth = arrowWidth;
    ctx.stroke();

    //starting a new path from the head of the arrow to one of the sides of
    //the point
    ctx.beginPath();
    ctx.moveTo(tox, toy);
    ctx.lineTo(tox - headlen * Math.cos(angle - Math.PI / 7),
        toy - headlen * Math.sin(angle - Math.PI / 7));

    //path from the side point of the arrow, to the other side point
    ctx.lineTo(tox - headlen * Math.cos(angle + Math.PI / 7),
        toy - headlen * Math.sin(angle + Math.PI / 7));

    //path from the side point back to the tip of the arrow, and then
    //again to the opposite side point
    ctx.lineTo(tox, toy);
    ctx.lineTo(tox - headlen * Math.cos(angle - Math.PI / 7),
        toy - headlen * Math.sin(angle - Math.PI / 7));

    //draws the paths created above
    ctx.stroke();
    ctx.restore();
}