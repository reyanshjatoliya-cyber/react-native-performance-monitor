import { useEffect } from 'react';
import LeakMonitor from '../monitors/LeakMonitor';

export const useLeakDetector = (name: string) => {
  useEffect(() => {
    LeakMonitor.track(name);

    return () => {
      LeakMonitor.markUnmounted(name);
    };
  }, []);
};
