class JSFrameMonitor {
  private interval: any;
  private lastTime: number = Date.now();
  private listeners: Function[] = [];

  start() {
    this.interval = setInterval(() => {
      const now = Date.now();
      const delta = now - this.lastTime;

      const lag = delta - 100; // expected interval

      this.listeners.forEach((cb) => cb(lag));
      this.lastTime = now;
    }, 100);
  }

  stop() {
    clearInterval(this.interval);
  }

  onUpdate(cb: (lag: number) => void) {
    this.listeners.push(cb);
  }
}

export default new JSFrameMonitor();
