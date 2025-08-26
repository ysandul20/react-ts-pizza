export type PizzaDataType = {
  id: number;
  imageUrl: string;
  name: string;
  sizes: number[];
  price: number;
  rating: number;
  types: number[];
  quantity: number;
  category: number;
};

export type CartItemType = {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  totalPrice: number;
  sizeOption: number;
  typeOption: number;
  quantity: number;
};
