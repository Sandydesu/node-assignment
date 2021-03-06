import { Document } from 'mongoose';

export interface IBook extends Document {
  name: string;
  author: string[];
  price: string;
  reviews: string[];
  publisher: string;
}
