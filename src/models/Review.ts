import { IReview } from '../interfaces';
import { ReviewSchemaModel } from '../schemas';

class ReviewModel {
  async getReviews(filter = {}, options = {}): Promise<IReview[]> {
    return await ReviewSchemaModel.find(filter, options);
  }

  async getReview(id: string): Promise<IReview> {
    return await ReviewSchemaModel.findOne({ _id: id });
  }

  async createReview(review: IReview): Promise<IReview> {
    return await ReviewSchemaModel.create(review);
  }

  async createReviews(reviews: IReview[]): Promise<IReview[]> {
    return await ReviewSchemaModel.insertMany(reviews);
  }
}

export default new ReviewModel();
