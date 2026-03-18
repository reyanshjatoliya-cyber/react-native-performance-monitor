const originalSetInterval = global.setInterval;
const originalClearInterval = global.clearInterval;

const intervalMap = new Map();

export const patchTimers = () => {
  global.setInterval = ((fn: any, delay?: number, ...args: any[]) => {
    const id = originalSetInterval(fn, delay, ...args);

    intervalMap.set(id, {
      createdAt: Date.now(),
    });

    return id;
  }) as typeof setInterval;

  global.clearInterval = (id: any) => {
    intervalMap.delete(id);
    return originalClearInterval(id);
  };
};

export const detectIntervalLeaks = () => {
  intervalMap.forEach((value, id) => {
    if (Date.now() - value.createdAt > 10000) {
      console.warn(`[LeakMonitor] Possible interval leak: ${id}`);
    }
  });
};
