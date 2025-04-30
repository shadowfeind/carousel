# React Fluid Carousel

A highly customizable React carousel component with smooth animations and responsive layouts.

## Features

- 🖼️ **Hero Carousel** - Full-width slider perfect for hero sections with text overlay and CTA buttons
- 🛍️ **Product Carousel** - Responsive grid layout ideal for showcasing products
- 📱 **Fully Responsive** - Customize how many items appear on different screen sizes
- 🎭 **Animations** - Beautiful animations powered by Framer Motion
- 👆 **Touch Support** - Swipe gestures for mobile devices
- ♿ **Accessible** - Built with accessibility in mind
- 🔄 **Auto Play** - Optional auto-rotation with customizable interval

## Installation

```bash
npm install react-fluid-carousel framer-motion
```

or

```bash
yarn add react-fluid-carousel framer-motion
```

Note: `framer-motion` is a peer dependency and needs to be installed separately.

## Usage

### Hero Carousel

```jsx
import { Carousel } from "react-fluid-carousel";

const App = () => {
  const heroItems = [
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
    // Add more slides as needed
  ];

  return (
    <Carousel
      type="hero"
      items={heroItems}
      autoPlay={true}
      autoPlayInterval={5000}
      showArrows={true}
      showDots={true}
    />
  );
};
```

### Product Carousel

```jsx
import { Carousel } from "react-fluid-carousel";

const App = () => {
  const productItems = [
    {
      image: "/images/product1.jpg",
      title: "Product 1",
      description: "Product description here",
      price: "$99.99",
      button: "Add to Cart",
    },
    {
      image: "/images/product2.jpg",
      title: "Product 2",
      description: "Product description here",
      price: "$149.99",
      button: "Add to Cart",
    },
    // Add more products as needed
  ];

  return (
    <Carousel
      type="product"
      items={productItems}
      autoPlay={true}
      autoPlayInterval={5000}
      showArrows={true}
      showDots={true}
      itemsPerView={{
        desktop: 4,
        tablet: 2,
        mobile: 1,
      }}
    />
  );
};
```

## Props

### Common Props

| Prop               | Type                  | Default  | Description                                        |
| ------------------ | --------------------- | -------- | -------------------------------------------------- |
| `type`             | `'hero' \| 'product'` | `'hero'` | Type of carousel to render                         |
| `items`            | `CarouselItem[]`      | `[]`     | Array of items to display in the carousel          |
| `autoPlay`         | `boolean`             | `true`   | Whether to auto-rotate slides                      |
| `autoPlayInterval` | `number`              | `5000`   | Time in ms between slides when autoPlay is enabled |
| `showArrows`       | `boolean`             | `true`   | Whether to show navigation arrows                  |
| `showDots`         | `boolean`             | `true`   | Whether to show navigation dots                    |

### Product Carousel Only

| Prop           | Type                                                  | Default                                | Description                                                |
| -------------- | ----------------------------------------------------- | -------------------------------------- | ---------------------------------------------------------- |
| `itemsPerView` | `{ desktop: number; tablet: number; mobile: number }` | `{ desktop: 4, tablet: 3, mobile: 1 }` | Number of items to show per slide at different breakpoints |

### Item Structure

```typescript
interface CarouselItem {
  image?: string; // URL to image
  title?: string; // Item title
  description?: string; // Item description
  button?: string; // Button text (optional)
  price?: string; // Price text (for product carousel)
  [key: string]: any; // Additional custom properties
}
```

## Breakpoints

The responsive breakpoints used are:

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

MIT
