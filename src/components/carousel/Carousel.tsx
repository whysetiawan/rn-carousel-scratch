import CarouselLayout from './CarouselLayout';

export type ItemRender<T> = ({ item, index }: { item: T; index: number }) => React.ReactNode;

export interface CarouselProps<T = any> {
  width: number;
  height: number;
  data: T[];
  renderItem: ItemRender<T>;
  onChange?: (index: number) => void;
}

const Carousel = <T,>(props: CarouselProps<T>) => {
  return <CarouselLayout {...props} />;
};

export default Carousel;
