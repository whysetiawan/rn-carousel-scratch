/* eslint-disable react-compiler/react-compiler */
import React from 'react';
import type { PropsWithChildren } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import type { SharedValue } from 'react-native-reanimated';
import Animated, { runOnJS, useSharedValue, withTiming } from 'react-native-reanimated';

type Props = PropsWithChildren<{
  itemSize: number;
  itemCount: number;
  style?: StyleProp<ViewStyle>;
  translation: SharedValue<number>;
  onScrollEnd?: () => void;
}>;

const ScrollGesture: React.FC<Props> = (props) => {
  const { children, itemSize, itemCount, style, translation, onScrollEnd } = props;

  const panOffset = useSharedValue(0);
  const maxScroll = useSharedValue(0);

  const snapToNearest = (value: number) => {
    'worklet';
    const min = 0;
    const max = -(itemCount * itemSize - itemSize); // Batas kanan
    const nearestIndex = Math.round(-value / itemSize);
    return Math.min(Math.max(-nearestIndex * itemSize, max), min);
  };

  const gesture = Gesture.Pan()
    .onStart(() => {
      panOffset.value = translation.value;
      maxScroll.value = (itemCount - 1) * itemSize;
    })
    .onUpdate((event) => {
      const panTranslation = event.translationX;

      if (translation.value > 0 || translation.value < -maxScroll.value) {
        const boundary = translation.value > 0 ? 0 : -maxScroll.value;
        const fixed = boundary - panOffset.value;
        const dynamic = panTranslation - fixed;
        translation.value = boundary + dynamic * 0.5;
        return;
      }

      translation.value = panOffset.value + panTranslation;
    })
    .onEnd((event) => {
      // const velocity = event.velocityX;
      // const panTranslation = event.translationX;
      const totalTranslation = panOffset.value + event.translationX;
      const snapPoint = snapToNearest(totalTranslation);

      // Animasi dengan efek snap
      translation.value = withTiming(snapPoint, { duration: 400 });
      onScrollEnd && runOnJS(onScrollEnd)();
    });

  return (
    <GestureHandlerRootView style={styles.display}>
      <GestureDetector gesture={gesture}>
        <Animated.View style={[style, styles.container]}>{children}</Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  display: {
    display: 'flex',
  },
});

export default ScrollGesture;
