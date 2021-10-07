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

  async updateReview(review_id: string, review: IReview): Promise<IReview> {
    const filter = { _id: review_id };
    const update = { ...review };
    return await ReviewSchemaModel.findOneAndUpdate(filter, update);
  }

  async deleteReview(review_id: string): Promise<IReview> {
    const filter = { _id: review_id };
    return await ReviewSchemaModel.findOneAndDelete(filter);
  }
}

export default new ReviewModel();
