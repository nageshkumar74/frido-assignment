export interface Product {
  id: number;
  title: string;
  vendor: string;

  images: {
    src: string;
  }[];

  variants: {
    id: number;
    title: string;
    price: string;
    compare_at_price: string | null;
  }[];
}