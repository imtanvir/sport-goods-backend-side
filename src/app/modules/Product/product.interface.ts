export type TImage = {
  id: string;
  url: string;
};

export type TProduct = {
  name: string;
  description: string;
  price: number;
  image?: TImage[];
  category: string;
  quantity: number;
  brand: string;
  rating: number;
};
