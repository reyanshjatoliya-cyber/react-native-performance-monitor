//import { useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import {
  initPerformanceMonitor,
  PerformanceOverlay,
  useLeakDetector,
} from 'react-native-performance-monitor';

initPerformanceMonitor();

const LeakyComponent = () => {
  useLeakDetector('LeakyComponent');

  // Simulate a memory leak by setting up an interval without cleanup
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     console.log('Running...');
  //   }, 1000);

  //   // ❌ Forgot cleanup
  //   // return () => clearInterval(interval);
  // }, []);

  return <Text>Leaky Component</Text>;
};

const HeavyComponent = () => {
  // simulate JS blocking
  const blockJS = () => {
    const start = Date.now();
    while (Date.now() - start < 200) {}
  };

  return (
    <View>
      <Text onPress={blockJS}>Click to Block JS Thread</Text>
    </View>
  );
};

export default function App() {
  return (
    <View style={{ flex: 1, marginVertical: 50 }}>
      <ScrollView>
        {Array.from({ length: 200 }).map((_, i) => (
          <Text key={i}>Item {i}</Text>
        ))}
        <HeavyComponent />
      </ScrollView>
      <PerformanceOverlay />
      <LeakyComponent />
    </View>
  );
}
