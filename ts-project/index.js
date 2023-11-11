"use strict";
class DrawingApp {
    constructor() {
        this.currentColor = "#000000"; //default
        this.lineWidth = 1;
        this.clickX = [];
        this.clickY = [];
        this.clickDrag = [];
        this.clearEventHandler = () => {
            this.clearCanvas();
        };
        this.releaseEventHandler = () => {
            this.paint = false;
            this.redraw();
            this.stopDrawing();
        };
        this.cancelEventHandler = () => {
            this.paint = false;
        };
        this.pressEventHandler = (e) => {
            let mouseX = e.changedTouches
                ? e.changedTouches[0].pageX
                : e.pageX;
            let mouseY = e.changedTouches
                ? e.changedTouches[0].pageY
                : e.pageY;
            mouseX -= this.canvas.offsetLeft;
            mouseY -= this.canvas.offsetTop;
            this.paint = true;
            this.addClick(mouseX, mouseY, false);
            this.redraw();
            this.startDrawing();
        };
        this.dragEventHandler = (e) => {
            let mouseX = e.changedTouches
                ? e.changedTouches[0].pageX
                : e.pageX;
            let mouseY = e.changedTouches
                ? e.changedTouches[0].pageY
                : e.pageY;
            mouseX -= this.canvas.offsetLeft;
            mouseY -= this.canvas.offsetTop;
            if (this.paint) {
                this.addClick(mouseX, mouseY, true);
                this.redraw();
            }
            e.preventDefault();
        };
        let canvas = document.getElementById("canvas");
        let context = canvas.getContext("2d");
        context.lineCap = "round";
        context.lineJoin = "round";
        // context.strokeStyle = this.currentColor; //set initial color
        context.lineWidth = this.lineWidth;
        this.canvas = canvas;
        this.context = context;
        this.redraw();
        this.createUserEvents();
    }
    changeStrokeSize(size) {
        this.context.lineWidth = size;
    }
    colorChange(color) {
        this.currentColor = color;
        this.context.strokeStyle = this.currentColor; //set new color
    }
    startDrawing() {
        this.context.strokeStyle = this.currentColor;
    }
    stopDrawing() {
        this.context.strokeStyle = this.currentColor;
    }
    createUserEvents() {
        let canvas = this.canvas;
        canvas.addEventListener("mousedown", this.pressEventHandler);
        canvas.addEventListener("mousemove", this.dragEventHandler);
        canvas.addEventListener("mouseup", this.releaseEventHandler);
        canvas.addEventListener("mouseout", this.cancelEventHandler);
        canvas.addEventListener("touchstart", this.pressEventHandler);
        canvas.addEventListener("touchmove", this.dragEventHandler);
        canvas.addEventListener("touchend", this.releaseEventHandler);
        canvas.addEventListener("touchcancel", this.cancelEventHandler);
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
    redraw() {
        let clickX = this.clickX;
        let context = this.context;
        let clickDrag = this.clickDrag;
        let clickY = this.clickY;
        for (let i = 0; i < clickX.length; i++) {
            context.beginPath();
            if (clickDrag[i] && i) {
                context.moveTo(clickX[i - 1], clickY[i - 1]);
            }
            else {
                context.moveTo(clickX[i] - 1, clickY[i]);
            }
            context.lineTo(clickX[i], clickY[i]);
            context.stroke();
        }
        context.closePath();
    }
    addClick(x, y, dragging) {
        this.clickX.push(x);
        this.clickY.push(y);
        this.clickDrag.push(dragging);
    }
    clearCanvas() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.clickX = [];
        this.clickY = [];
        this.clickDrag = [];
    }
    DownloadCanvasAsImage() {
        const downloadLink = document.createElement("a");
        downloadLink.setAttribute("download", "CanvasAsImage.png");
        const canvas = document.getElementById("canvas");
        if (canvas) {
            const dataURL = canvas.toDataURL("image/png");
            const url = dataURL.replace(/^data:image\/png/, "data:application/octet-stream");
            downloadLink.setAttribute("href", url);
            downloadLink.click();
        }
    }
}
const drawingAppInstance = new DrawingApp();
