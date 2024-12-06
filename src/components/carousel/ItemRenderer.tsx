import type { SharedValue } from 'react-native-reanimated';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';

import type { ItemRender } from './Carousel';

interface ItemRendererProps {
  data: any[];
  renderItem: ItemRender<any>;
  offset: SharedValue<number>;
  itemSize: number;
  itemCount: number;
}

const ItemRenderer: React.FC<ItemRendererProps> = (props) => {
  const { data, renderItem, offset, itemCount, itemSize } = props;
  return data.map((item, i) => {
    return (
      <ItemLayout index={i} itemSize={itemSize} itemCount={itemCount} key={i} offset={offset}>
        {renderItem({ item, index: i })}
      </ItemLayout>
    );
  });
};

const ItemLayout: React.FC<{
  offset: SharedValue<number>;
  children: React.ReactNode;
  index: number;
  itemSize: number;
  itemCount: number;
}> = (props) => {
  const { offset, children, index, itemSize } = props;

  const x = useDerivedValue(() => {
    return offset.value + itemSize * index;
  }, []);

  // const animatedStyle = useAnimatedStyle(() => {
  //   const PARALLAX_SCALE = 0.9;
  //   const PARALLAX_OFFSET = 80;
  //   const PARALLAX_ADJACENT = PARALLAX_SCALE ** 2;

  //   const translation = interpolate(
  //     x.value / itemSize,
  //     [-1, 0, 1],
  //     [-itemSize + PARALLAX_OFFSET, 0, itemSize - PARALLAX_OFFSET],
  //   );

  //   const zIndex = interpolate(x.value / itemSize, [-1, 0, 1], [0, 1, 0], Extrapolation.CLAMP);

  //   const scale = interpolate(
  //     x.value / itemSize,
  //     [-1, 0, 1],
  //     [PARALLAX_ADJACENT, PARALLAX_SCALE, PARALLAX_ADJACENT],
  //     Extrapolation.CLAMP,
  //   );

  //   return {
  //     transform: [
  //       { translateX: translation }, // Regular horizontal movement

  //       {
  //         scale,
  //       },
  //     ],
  //     zIndex,
  //   };
  // }, [itemSize, x.value]);

  const animatedStyle = useAnimatedStyle(() => {
    const PARALLAX_SPACE = 50;
    const PARALLAX_SCALE = 0.9;
    const PARALLAX_ADJACENT_SCALE = PARALLAX_SCALE ** 2;

    const translation = interpolate(
      x.value / itemSize,
      [-1, 0, 1],
      [-itemSize + PARALLAX_SPACE, 0, itemSize - PARALLAX_SPACE],
    );

    const zIndex = interpolate(x.value / itemSize, [-1, 0, 1], [0, 1, 0], Extrapolation.CLAMP);

    const scale = interpolate(
      x.value / itemSize,
      [-1, 0, 1],
      [PARALLAX_ADJACENT_SCALE, PARALLAX_SCALE, PARALLAX_ADJACENT_SCALE],
      Extrapolation.CLAMP,
    );

    return {
      width: '100%',
      height: '100%',
      transform: [
        { translateX: translation },
        {
          scale,
        },
      ],
      zIndex,
    };
  }, [itemSize, x.value]);

  return (
    <Animated.View
      style={[
        {
          width: '100%',
          height: '100%',
          position: 'absolute',
        },
        animatedStyle,
      ]}>
      {children}
    </Animated.View>
  );
};

export default ItemRenderer;
