import { Document } from 'mongoose';

export interface IPublisher extends Document {
  publisher_id: string;
  name: string;
  location: string;
}
