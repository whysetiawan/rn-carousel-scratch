import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Dimensions, Pressable, SafeAreaView, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';

import type { RootStackParamList } from '../../types';

import Carousel from '#/components/carousel/Carousel';

const data = [
  { title: 'Slide 1', backgroundColor: '#FF5733' },
  { title: 'Slide 2', backgroundColor: '#33FF57' },
  { title: 'Slide 3', backgroundColor: '#3357FF' },
  { title: 'Slide 4', backgroundColor: '#FF33A1' },
];

type Props = NativeStackScreenProps<RootStackParamList, 'IndexScreen'>;

const width = Dimensions.get('screen').width;
const Index: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Carousel
        width={width}
        height={200}
        data={data}
        renderItem={({ item, index }) => {
          return (
            <CarouselItem
              item={item}
              index={index}
              onPress={() =>
                navigation.navigate('DetailScreen', {
                  title: item.title,
                  backgroundColor: item.backgroundColor,
                  index: index,
                })
              }
            />
          );
        }}
      />
    </SafeAreaView>
  );
};

const CarouselItem: React.FC<{
  item: (typeof data)[number];
  index: number;
  onPress?: () => void;
}> = ({ item, onPress, index }) => {
  return (
    <>
      <Pressable onPress={onPress} style={{ flex: 1 }}>
        <Animated.View
          sharedTransitionTag={`containerTag-${index}`}
          key={item.title}
          style={{
            flex: 1,
            backgroundColor: item.backgroundColor,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Animated.Text
            sharedTransitionTag={`titleTag-${index}`}
            style={{ color: '#fff', fontSize: 24 }}>
            {item.title}
          </Animated.Text>
        </Animated.View>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default Index;
