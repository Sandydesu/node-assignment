import { Schema, model } from 'mongoose';
import { IBook } from '../interfaces';

const BookSchema = new Schema<IBook>({
  name: { type: String, required: true },
  author: { type: [String], required: true },
  price: { type: String, required: true },
  reviews: { type: [String], required: true },
  publisher: { type: String, required: true },
},{ versionKey: false });

export const BookSchemaModel = model<IBook>('Book', BookSchema);
