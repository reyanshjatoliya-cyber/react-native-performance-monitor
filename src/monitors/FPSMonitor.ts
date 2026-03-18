class FPSMonitor {
  private lastFrameTime = Date.now();
  private frameCount = 0;
  private listeners: Function[] = [];

  start() {
    const loop = () => {
      const now = Date.now();
      this.frameCount++;

      if (now - this.lastFrameTime >= 1000) {
        const fps = this.frameCount;
        this.listeners.forEach((cb) => cb(fps));

        this.frameCount = 0;
        this.lastFrameTime = now;
      }

      requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);
  }

  onUpdate(cb: (fps: number) => void) {
    this.listeners.push(cb);
  }
}

export default new FPSMonitor();
