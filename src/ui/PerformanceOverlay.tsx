import { View, Text, StyleSheet } from 'react-native';
import { usePerformance } from '../hooks/usePerformance';
import LeakMonitor from '../monitors/LeakMonitor';
import { useEffect, useState } from 'react';

const PerformanceOverlay = () => {
  const { fps, lag, memory } = usePerformance();
  const [leaks, setLeaks] = useState<string[]>([]);
  useEffect(() => {
    LeakMonitor.startAutoCheck();

    const interval = setInterval(() => {
      const activeLeaks: string[] = [];

      // @ts-ignore
      LeakMonitor.tracked.forEach((_, key) => {
        activeLeaks.push(key);
      });

      setLeaks(activeLeaks);
    }, 3000);

    return () => clearInterval(interval);
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>FPS: {fps}</Text>
      <Text style={styles.text}>JS Lag: {lag.toFixed(2)} ms</Text>
      <Text style={styles.text}>
        Memory: {(memory / 1024 / 1024).toFixed(2)} MB
      </Text>

      <View style={{ marginTop: 10 }}>
        <Text style={{ color: 'white' }}>{'⚠️ Leak'}</Text>
        {leaks.map((leak) => (
          <Text key={leak} style={{ color: 'red' }}>
            {leak}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 40,
    right: 10,
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 8,
    zIndex: 9999,
  },
  text: {
    color: 'lime',
    fontSize: 12,
  },
});

export default PerformanceOverlay;
