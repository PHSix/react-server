function setup() {
  const canvas = document.querySelector('#canvas');
  if (canvas === null) return;
  new CanvasBg(canvas as HTMLCanvasElement);
}

interface Point {
  x: number;
  y: number;
  xa: number;
  ya: number;
  max: number;
}

class CanvasBg {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  lineColor: string;
  pointColor: string;
  pointCount: number;
  current: Point;
  timer: number;
  points: Point[];
  all: Point[];
  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    this.canvas.height = canvas.clientHeight;
    this.canvas.width = canvas.clientWidth;
    this.lineColor = '255 0 0';
    this.pointColor = '255 0 0';
    this.pointCount = 90;
    this.current = {
      x: 0,
      y: 0,
      xa: 0,
      ya: 0,
      max: 20000,
    };
    this.timer = 0;
    this.points = this.randomPoints();
    this.all = this.points.concat([this.current]);

    this.bindEvent();

    this.requestFrame(this.drawCanvas);
  }
  randomPoints() {
    const points: Point[] = [];
    for (let i = 0; i < this.pointCount; i++) {
      points.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        xa: Math.random() * 2 - 1,
        ya: Math.random() * 2 - 1,
        max: 6000,
      });
    }
    return points;
  }
  bindEvent() {
    window.onmousemove = (e) => {
      this.current.x = e.clientX - this.canvas.offsetLeft;
      this.current.y = e.clientY - this.canvas.offsetTop;
    };

    window.onmouseout = () => {
      this.current.x = 0;
      this.current.y = 0;
    };
  }
  drawCanvas() {
    const {
      all,
      points,
      ctx,
      canvas: { width, height },
    } = this;

    ctx.clearRect(0, 0, width, height);

    points.forEach((point, idx) => {
      point.x += point.xa;
      point.y += point.ya;
      point.xa *= point.x > width || point.x < 0 ? -1 : 1;
      point.ya *= point.y > width || point.y < 0 ? -1 : 1;
      ctx.fillStyle = `rgba(${this.pointColor})`;
      ctx.fillRect(point.x - 0.5, point.y - 0.5, 1, 1);
      for (let i = idx + 1; i < all.length; i++) {
        let nextPoint = all[i];
        let dist =
          Math.pow(point.x - nextPoint.x, 2) +
          Math.pow(point.y - nextPoint.y, 2);
        if (dist < nextPoint.max) {
          let d = (nextPoint.max - dist) / nextPoint.max;
          ctx.beginPath();
          ctx.lineWidth = d;
          ctx.strokeStyle = `rgba(${this.lineColor}, ${d})`;
          ctx.moveTo(point.x, point.y);
          ctx.lineTo(nextPoint.x, nextPoint.y);
          ctx.stroke();
        }
      }
    });
    this.requestFrame(this.drawCanvas);
  }

  requestFrame(func: Function) {
    this.timer = requestAnimationFrame(() => func.call(this));
  }
}

export default setup
