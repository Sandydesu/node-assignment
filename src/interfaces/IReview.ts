import { Document } from 'mongoose';

export interface IReview extends Document {
  review_id: string;
  reviewer: string;
  message: string;
}
