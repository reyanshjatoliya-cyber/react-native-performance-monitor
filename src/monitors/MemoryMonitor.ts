import { NativeModules, Platform } from 'react-native';

const { MemoryModule } = NativeModules;

class MemoryMonitor {
  private listeners: Function[] = [];

  async getMemory() {
    try {
      if (MemoryModule) {
        return await MemoryModule.getMemoryUsage();
      } else {
        // fallback (approx)
        return {
          usedJSHeapSize:
            (global as any)?.performance?.memory?.usedJSHeapSize || 0,
        };
      }
    } catch {
      return { usedJSHeapSize: 0 };
    }
  }

  start() {
    setInterval(async () => {
      const mem = await this.getMemory();
      this.listeners.forEach((cb) => cb(mem));
    }, 2000);
  }

  onUpdate(cb: (mem: any) => void) {
    this.listeners.push(cb);
  }
}

export default new MemoryMonitor();
