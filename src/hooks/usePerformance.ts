import { useEffect, useState } from 'react';
import JSFrameMonitor from '../monitors/JSFrameMonitor';
import FPSMonitor from '../monitors/FPSMonitor';
import MemoryMonitor from '../monitors/MemoryMonitor';

export const usePerformance = () => {
  const [fps, setFPS] = useState(0);
  const [lag, setLag] = useState(0);
  const [memory, setMemory] = useState(0);

  useEffect(() => {
    JSFrameMonitor.start();
    FPSMonitor.start();
    MemoryMonitor.start();

    JSFrameMonitor.onUpdate(setLag);
    FPSMonitor.onUpdate(setFPS);
    MemoryMonitor.onUpdate((mem) => {
      setMemory(mem.usedJSHeapSize || 0);
    });
  }, []);

  return { fps, lag, memory };
};
