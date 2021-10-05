import { Schema, model } from 'mongoose';
import { IReview } from '../interfaces';

const ReviewSchema = new Schema<IReview>({
  reviwer: { type: String, required: true },
  message: { type: String, required: true },
},{ versionKey: false });

export const ReviewSchemaModel = model<IReview>('Review', ReviewSchema);
