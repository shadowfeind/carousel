import React from "react";

import {
  CarouselProps,
  HeroCarouselProps,
  ProductCarouselProps,
} from "../types";
import { ProductCarousel } from "./ProductCarousel";
import { HeroCarousel } from "./HeroCarousel";

export const Carousel: React.FC<CarouselProps> = (props) => {
  const { type = "hero", ...restProps } = props;

  if (type === "hero") {
    return <HeroCarousel {...(restProps as HeroCarouselProps)} type="hero" />;
  }

  return (
    <ProductCarousel {...(restProps as ProductCarouselProps)} type="product" />
  );
};
