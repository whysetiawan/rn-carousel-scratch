/* eslint-disable react-compiler/react-compiler */
import { useAnimatedReaction, useSharedValue, type SharedValue } from 'react-native-reanimated';

interface Props {
  offset: SharedValue<number>;
  itemSize: number;
  itemCount: number;
}
export const useCarousel = (props: Props) => {
  const { offset } = props;

  const index = useSharedValue(0);

  useAnimatedReaction(
    () => {
      const newIndex = Math.round(-offset.value / props.itemSize);
      return {
        i: newIndex,
      };
    },
    ({ i }) => {
      index.value = i;
    },
  );

  return {
    index,
  };
};
