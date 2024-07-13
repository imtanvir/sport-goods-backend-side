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
  stock_quantity: number;
  brand: string;
  rating: number;
};
export type TFeedback = {
  email: string;
  message: string;
};
