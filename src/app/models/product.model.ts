export interface Product {
  id?: string;
  title: string;
  price: string;
  description: string;
  category: string;
  image?: string;
}

export const mockProduct: Product[] = [
  {
    id: '1',
    title: 'product',
    price: '1',
    description: 'new mousepad',
    category: 'mousepad',
  },
];

export const mockProductEdit: Product[] = [
  {
    id: '2',
    title: 'product',
    price: '2',
    description: 'new mousepad',
    category: 'mousepad',
  },
];
