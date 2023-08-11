import React, { useEffect, useState } from 'react';
import { StyleSheet, Pressable, Text, View, Platform } from 'react-native';

export const DebugBar = ({ data: objectData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [debouncedData, setDebouncedData] = useState(objectData);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timer) {
      clearTimeout(timer);
    }

    const newTimer = setTimeout(() => {
      setDebouncedData(objectData);
    }, 500); // Update every 500ms

    setTimer(newTimer);

    // Clean up effect
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [objectData]);

  return (
    <View>
      <Pressable onPress={() => setIsOpen(!isOpen)}>
        <View style={styles.debugHeader}>
          <Text style={styles.debugTitle}>Debug Bar</Text>
        </View>
      </Pressable>
      {isOpen && (
        <View style={styles.debugContainer}>
          <Text style={styles.preformattedText}>{JSON.stringify(debouncedData, null, 2)}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  debugContainer: {
    backgroundColor: 'lightgrey',
    justifyContent: 'center',
    padding: 16,
    width: '100%'
  },
  debugHeader: {
    backgroundColor: 'darkgrey',
    paddingLeft: 15,
    paddingTop: 5,
    paddingBottom: 5
  },
  debugTitle: {
    color: 'black',
    fontWeight: 'bold'
  },
  preformattedText: {
    fontFamily: Platform.select({
      ios: 'Courier New',
      android: 'monospace',
    }),
    color: 'black',
  },
});
