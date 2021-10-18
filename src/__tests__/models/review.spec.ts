import ReviewModel from '../../models/Review';

import { ReviewSchemaModel } from '../../schemas';

import reviewDetails from '../mock/data/mock-review';

jest.mock('../../schemas');

describe('Review Model', () => {
  it('Get reviews', (done) => {
    (ReviewSchemaModel.find as jest.Mock).mockResolvedValue([{ ...reviewDetails }]);
    ReviewModel.getReviews().then((value) => {
      expect(value.length).toEqual(1);
      done();
    });
  });

  it('Get review', (done) => {
    (ReviewSchemaModel.findOne as jest.Mock).mockResolvedValue({ ...reviewDetails });
    ReviewModel.getReview(reviewDetails._id).then((value) => {
      expect(value._id).toEqual(reviewDetails._id);
      done();
    });
  });

  it('Create review', (done) => {
    (ReviewSchemaModel.create as jest.Mock).mockResolvedValue({ ...reviewDetails });
    const review = new ReviewSchemaModel(reviewDetails);

    ReviewModel.createReview(review).then((value) => {
      expect(value._id).toEqual(reviewDetails._id);
      done();
    });
  });

  it('Create reviews', (done) => {
    (ReviewSchemaModel.insertMany as jest.Mock).mockResolvedValue([{ ...reviewDetails }]);
    const review = new ReviewSchemaModel(reviewDetails);

    ReviewModel.createReviews([review]).then((value) => {
      expect(value.length).toEqual(1);
      done();
    });
  });

  it('Update review', (done) => {
    (ReviewSchemaModel.findOneAndUpdate as jest.Mock).mockResolvedValue({ ...reviewDetails });
    const review = new ReviewSchemaModel(reviewDetails);

    ReviewModel.updateReview(reviewDetails._id, review).then((value) => {
      expect(value._id).toEqual(reviewDetails._id);
      done();
    });
  });

  it('Delete review', (done) => {
    (ReviewSchemaModel.findOneAndDelete as jest.Mock).mockResolvedValue({ ...reviewDetails });

    ReviewModel.deleteReview(reviewDetails._id).then((value) => {
      expect(value._id).toEqual(reviewDetails._id);
      done();
    });
  });
});
