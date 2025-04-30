export type CarouselItem = {
  image: string;
  title?: string;
  description?: string;
  button?: string;
  price?: string;
  [key: string]: string | undefined;
};

export type ItemsPerView = {
  desktop: number;
  tablet: number;
  mobile: number;
};

export type BaseCarouselProps = {
  items: CarouselItem[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showArrows?: boolean;
  showDots?: boolean;
};

export type HeroCarouselProps = BaseCarouselProps & {
  type: "hero";
};

export type ProductCarouselProps = BaseCarouselProps & {
  type: "product";
  itemsPreView: ItemsPerView;
};

export type CarouselProps = HeroCarouselProps | ProductCarouselProps;
