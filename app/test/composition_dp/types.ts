export interface Product {
  id: number;
  image: string;
  title: string;
  category: string;
  rating: {
    stars: number;
    reviews: number;
  };
  price: number;
}
