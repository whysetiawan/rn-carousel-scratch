import { useSharedValue } from 'react-native-reanimated';

import type { CarouselProps } from '#/components/carousel/Carousel';

export const useCommonValues = (props: CarouselProps) => {
  const itemSize = props.width;
  const itemCount = props.data.length;
  const _handlerOffset = useSharedValue(0);

  return {
    itemSize,
    itemCount,
    handlerOffset: _handlerOffset,
  };
};
