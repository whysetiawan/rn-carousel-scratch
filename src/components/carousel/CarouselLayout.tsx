/* eslint-disable react-compiler/react-compiler */

import { useCallback, useEffect, useState } from 'react';
import { runOnJS, useAnimatedReaction } from 'react-native-reanimated';

import ScrollGesture from '#/components/carousel/ScrollGesture';
import { useCarousel } from '#/components/carousel/useCarousel';
import { useCommonValues } from '#/components/carousel/useCommonValues';

import type { CarouselProps } from './Carousel';
import ItemRenderer from './ItemRenderer';

const CarouselLayout = (props: CarouselProps) => {
  const { width, height, data, renderItem, onChange } = props;
  const { itemCount, itemSize, handlerOffset } = useCommonValues(props);
  const { index } = useCarousel({
    offset: handlerOffset,
    itemCount,
    itemSize,
  });

  const onChangeIndex = useCallback(() => {
    onChange?.(index.value);
  }, [index.value, onChange]);

  return (
    <ScrollGesture
      style={{
        width,
        height,
      }}
      translation={handlerOffset}
      itemSize={itemSize}
      itemCount={itemCount}
      onScrollEnd={onChangeIndex}>
      <ItemRenderer
        offset={handlerOffset}
        data={data}
        renderItem={renderItem}
        itemSize={itemSize}
        itemCount={itemCount}
      />
    </ScrollGesture>
  );
};

export default CarouselLayout;
