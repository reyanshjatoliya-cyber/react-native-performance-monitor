export { default as PerformanceOverlay } from './ui/PerformanceOverlay';
export { usePerformance } from './hooks/usePerformance';
import LeakMonitor from './monitors/LeakMonitor';
import { patchTimers } from './utils/patchTimer';
export { useLeakDetector } from './hooks/useLeakDetector';

export const initPerformanceMonitor = () => {
  patchTimers();
  LeakMonitor.startAutoCheck();
};
