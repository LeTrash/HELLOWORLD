class DrawingApp {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private paint: boolean;
  private currentColor: string = "#000000"; //default
  private lineWidth = 1;
  private clickColors: string[][] = [];

  private clickX: number[] = [];
  private clickY: number[] = [];
  private clickDrag: boolean[] = [];

  constructor() {
    let canvas = document.getElementById("canvas") as HTMLCanvasElement;
    let context = canvas.getContext("2d");
    context.lineCap = "round";
    context.lineJoin = "round";
    // context.strokeStyle = this.currentColor; //set initial color
    context.lineWidth = this.lineWidth;

    this.canvas = canvas;
    this.context = context;

    this.redraw();
    this.startDrawing();
    this.stopDrawing();
    this.createUserEvents();
  }

  private startDrawing() {
    this.canvas.addEventListener("mousedown", this.pressEventHandler);
    this.canvas.addEventListener("mousemove", this.dragEventHandler);
    this.canvas.addEventListener("touchstart", this.pressEventHandler);
    this.canvas.addEventListener("touchmove", this.dragEventHandler);
    this.context.strokeStyle = this.currentColor;
  }

  private stopDrawing() {
    this.canvas.addEventListener("mouseup", this.releaseEventHandler);
    this.canvas.addEventListener("mouseout", this.cancelEventHandler);
    this.canvas.addEventListener("touchend", this.releaseEventHandler);
    this.canvas.addEventListener("touchcancel", this.cancelEventHandler);
    this.context.strokeStyle = this.currentColor;
  }

  private createUserEvents() {
    document
      .getElementById("clear")
      .addEventListener("click", this.clearEventHandler);

    const colorButtons = document.querySelectorAll(".colorbutton");
    colorButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const color = button.getAttribute("data-color");
        if (color) {
          this.colorChange(color);
        }
      });
    });

    const sizeButtons = document.querySelectorAll(".ss");
    sizeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const size = parseInt(button.innerText.split(" ")[1], 10);
        if (!isNaN(size)) {
          this.changeStrokeSize(size);
        }
      });
    });
  }

  private addClick(x: number, y: number, dragging: boolean) {
    this.clickX.push(x);
    this.clickY.push(y);
    this.clickDrag.push(dragging);
    this.clickColors.push([]);
    this.clickColors[this.clickColors.length - 1].push(this.currentColor);
  }

  private changeStrokeSize(size: number) {
    this.context.lineWidth = size;
  }

  private colorChange(color: string) {
    this.currentColor = color;
    this.context.strokeStyle = this.currentColor; //set new color
  }

  private clearCanvas() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.clickX = [];
    this.clickY = [];
    this.clickDrag = [];
  }

  private clearEventHandler = () => {
    this.clearCanvas();
  };

  private releaseEventHandler = () => {
    this.paint = false;
    this.redraw();
    this.stopDrawing();
  };

  private cancelEventHandler = () => {
    this.paint = false;
  };
  private pressEventHandler = (e: MouseEvent | TouchEvent) => {
    let mouseX = (e as TouchEvent).changedTouches
      ? (e as TouchEvent).changedTouches[0].pageX
      : (e as MouseEvent).pageX;
    let mouseY = (e as TouchEvent).changedTouches
      ? (e as TouchEvent).changedTouches[0].pageY
      : (e as MouseEvent).pageY;
    mouseX -= this.canvas.offsetLeft;
    mouseY -= this.canvas.offsetTop;

    this.paint = true;
    this.addClick(mouseX, mouseY, false);
    this.redraw();
    this.startDrawing();
  };

  private dragEventHandler = (e: MouseEvent | TouchEvent) => {
    let mouseX = (e as TouchEvent).changedTouches
      ? (e as TouchEvent).changedTouches[0].pageX
      : (e as MouseEvent).pageX;
    let mouseY = (e as TouchEvent).changedTouches
      ? (e as TouchEvent).changedTouches[0].pageY
      : (e as MouseEvent).pageY;
    mouseX -= this.canvas.offsetLeft;
    mouseY -= this.canvas.offsetTop;

    if (this.paint) {
      this.addClick(mouseX, mouseY, true);
      this.redraw();
    }
    e.preventDefault();
  };

  DownloadCanvasAsImage() {
    const downloadLink: HTMLAnchorElement = document.createElement("a");
    downloadLink.setAttribute("download", "CanvasAsImage.png");
    const canvas: HTMLCanvasElement | null = document.getElementById(
      "canvas"
    ) as HTMLCanvasElement;
    if (canvas) {
      const dataURL: string = canvas.toDataURL("image/png");
      const url: string = dataURL.replace(
        /^data:image\/png/,
        "data:application/octet-stream"
      );
      downloadLink.setAttribute("href", url);
      downloadLink.click();
    }
  }

  private redraw() {
    let clickX = this.clickX;
    let context = this.context;
    let clickDrag = this.clickDrag;
    let clickY = this.clickY;

    for (let i = 0; i < this.clickX.length; i++) {
      context.beginPath();
      context.strokeStyle = this.clickColors[i][0];
      if (clickDrag[i] && i) {
        context.moveTo(clickX[i - 1], clickY[i - 1]);
      } else {
        context.moveTo(clickX[i] - 1, clickY[i]);
      }
      context.lineTo(clickX[i], clickY[i]);
      context.stroke();
    }
    context.closePath();
  }
}
const drawingAppInstance = new DrawingApp();
