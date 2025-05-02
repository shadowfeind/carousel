import { Meta, StoryObj } from "@storybook/react";
import { CarouselProps } from "../../src/types";
import { Carousel } from "..";

type StoryProps = CarouselProps;

const meta: Meta<StoryProps> = {
  title: "Components/Carousel",
  component: Carousel,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<StoryProps>;

export const CarouselStory: Story = {
  args: {
    items: [
      {
        image: "/images/hero1.jpg",
        title: "Welcome to our store",
        description: "Discover amazing products at great prices",
        button: "Shop Now",
      },
      {
        image: "/images/hero2.jpg",
        title: "Summer Collection",
        description: "Check out our latest summer arrivals",
        button: "View Collection",
      },
    ],
  },
};
